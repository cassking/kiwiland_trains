require_relative 'graph'

graph = Graph.load_from_file('input.txt')

puts "Output #1: #{graph.weight_between 'A', 'B', 'C'}"
puts "Output #2: #{graph.weight_between 'A', 'D'}"
puts "Output #3: #{graph.weight_between 'A', 'D', 'C'}"
puts "Output #4: #{graph.weight_between 'A', 'E', 'B', 'C', 'D'}"
puts "Output #5: #{graph.weight_between 'A', 'E', 'D'}"
puts "Output #6: #{graph.find_all_paths('C', 'C', 3).count}"
puts "Output #7: #{graph.find_all_paths('A', 'C', 4, true).count}"
puts "Output #8: #{graph.shortest_path('A', 'C')}"
puts "Output #9: #{graph.shortest_path('B', 'B')}"
#puts "Output #10: #{graph.dijkstra('B', 'B')}"
