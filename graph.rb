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
end

class Edge
  attr_accessor :source, :target, :weight

  def initialize source, target, weight=1
    @source = source
    @target = target
    @weight = weight
  end
end