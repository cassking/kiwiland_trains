class Graph < Array
  def initialize data
    @edges = []
    load data
  end

  def load data
    data.scan(/([A-Z])([A-Z])(\d+)/) do |source, target, weight|
      connect source, target, weight.to_i
    end
  end

  def connect source, target, weight=1
    push source unless self.include? source
    push target unless self.include? target

    if edge = find_edge(source, target)
      edge.weight = weight
    else
      @edges.push source: source, target: target, weight: weight
    end
  end

  def neighbors vertex
    neighbors = []

    @edges.each do |edge|
      neighbors.push edge[:target] if edge[:source] == vertex
    end

    return neighbors.uniq
  end

  def traverse source, target, k, path=[], &block
    path = path + [source]

    return [] unless include? source
    paths = yield(source, target, k, path) ? [path] : []

    neighbors(source).each do |neighbor|
      if path.length < k + 1
        new_paths = traverse neighbor, target, k, path, &block
        paths = paths + new_paths
      end
    end

    paths
  end

  def find_all_paths_max_w source, target, w, path=[]
    path = path + [source]

    return [] unless include? source
    paths = path.length > 1 && path[-1] == target && weight_between(*path) < w ? [path] : []

    neighbors(source).each do |neighbor|
      if weight_between(*path) + weight_between(source, neighbor) < w
        new_paths = find_all_paths_max_w neighbor, target, w, path
        paths = paths + new_paths
      end
    end

    paths
  end

  def find_all_paths_max_k source, target, k, path=[]
    traverse(source, target, k, path) { |target, source, k, path| target == source && path.length > 1 }
  end

  def find_all_paths_exactly_k source, target, k, path=[]
    traverse(source, target, k, path) { |target, source, k, path| target == source && path.length == k + 1 }
  end

  def find_edge source, target
    @edges.find { |edge| edge[:source] == source && edge[:target] == target }
  end

  def weight_between *nodes
    weight = 0

    while (source = nodes.shift) && nodes.length > 0
      target = nodes[0]
      edge = find_edge source, target
      return 'NO SUCH ROUTE' unless edge
      weight = weight + edge[:weight]
    end

    weight
  end

  # dijkstra
  # http://en.wikipedia.org/wiki/Dijkstra's_algorithm#Pseudocode
  def shortest_path source, target
    distances = Hash.new Float::INFINITY
    vertices = clone

    if source == target
      vertices.neighbors(source).each { |neighbor| distances[neighbor] = vertices.weight_between source, neighbor }
    else
      distances[source] = 0
    end

    until vertices.empty?
      nearest = vertices.min_by { |vertex| distances[vertex] }
      vertices.delete nearest

      break if distances[nearest] == Float::INFINITY

      vertices.neighbors(nearest).each do |vertex|
        if (new_distance = distances[nearest] + vertices.weight_between(nearest, vertex)) < distances[vertex]
          distances[vertex] = new_distance
        end
      end
    end

    distances[target]
  end
end
