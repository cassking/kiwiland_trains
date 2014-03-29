#!/usr/bin/env ruby

require_relative 'graph'

if __FILE__ == $PROGRAM_NAME
  graph = Graph.new ARGF.read

  puts "Output #1: #{graph.weight_between 'A', 'B', 'C'}"
  puts "Output #2: #{graph.weight_between 'A', 'D'}"
  puts "Output #3: #{graph.weight_between 'A', 'D', 'C'}"
  puts "Output #4: #{graph.weight_between 'A', 'E', 'B', 'C', 'D'}"
  puts "Output #5: #{graph.weight_between 'A', 'E', 'D'}"
  puts "Output #6: #{graph.find_all_paths_max_k('C', 'C', 3).count}"
  puts "Output #7: #{graph.find_all_paths_exactly_k('A', 'C', 4).count}"
  puts "Output #8: #{graph.shortest_path('A', 'C')}"
  puts "Output #9: #{graph.shortest_path('B', 'B')}"
  puts "Output #10: #{graph.find_all_paths_max_w('C', 'C', 30).count}"
end
