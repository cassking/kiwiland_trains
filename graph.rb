class Graph < Array
  def initialize
    @edges = []
  end

  def self.load_from_file path
    new.tap do |graph|
      data = File.read path

      data.scan(/([A-Z])([A-Z])(\d+)/) do |source, target, weight|
        graph.connect source, target, weight.to_i
      end
    end
  end

  def connect source, target, weight=1
    push source unless self.include? source
    push target unless self.include? target

    if edge = find_edge(source, target)
      edge.weight = weight
    else
      @edges.push Edge.new(source, target, weight)
    end
  end

  def neighbors vertex
    neighbors = []

    @edges.each do |edge|
      neighbors.push edge.target if edge.source == vertex
    end

    return neighbors.uniq
  end

  def find_all_paths source, target, k, exactly=false, path=[]
    path = path + [source]

    check = exactly ? path.length > k : path.length >= k
    return [path] if target == source && check
    return [] unless include? source

    paths = []
    neighbors(source).each do |neighbor|
      if path.length < k + 1
        new_paths = find_all_paths neighbor, target, k, exactly, path
        paths = paths + new_paths
      end
    end

    paths
  end

  def find_edge source, target
    @edges.find { |edge| edge.source == source && edge.target == target }
  end

  def weight_between *nodes
    weight = 0

    while (source = nodes.shift) && nodes.length > 0
      target = nodes[0]
      edge = find_edge source, target
      return 'NO SUCH ROUTE' unless edge
      weight = weight + edge.weight
    end

    weight
  end

  # dijkstra
  # http://en.wikipedia.org/wiki/Dijkstra's_algorithm#Pseudocode
  def shortest_path source, target
    distances = {}
    vertices = clone

    each do |vertex|
      distances[vertex] = Float::INFINITY
    end

    if source != target
      distances[source] = 0
    else
      neighbors = vertices.neighbors(source)
      neighbors.each { |neighbor| distances[neighbor] = vertices.weight_between source, neighbor }
    end

    until vertices.empty?
      nearest_vertex = vertices.inject do |a, b|
        distances[a] < distances[b] ? a : b
      end

      break if distances[nearest_vertex] == Float::INFINITY

      neighbors = vertices.neighbors(nearest_vertex)
      neighbors.each do |vertex|
        new_distance = distances[nearest_vertex] + vertices.weight_between(nearest_vertex, vertex)
        distances[vertex] = new_distance if !distances[vertex] || new_distance < distances[vertex]
      end

      vertices.delete nearest_vertex
    end

    distances[target]
  end
end

class Edge
  attr_accessor :source, :target, :weight

  def initialize source, target, weight=1
    @source = source
    @target = target
    @weight = weight
  end
end
