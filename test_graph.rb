#!/usr/bin/env ruby

require 'test/unit'
require_relative 'graph'

class TestGraph < Test::Unit::TestCase
  def setup
    @graph = Graph.new File.read 'input.txt'
  end

  def test_weight_between_output1
    expected = @graph.weight_between 'A', 'B', 'C'
    assert_equal expected, 9
  end

  def test_weight_between_output2
    expected = @graph.weight_between 'A', 'D'
    assert_equal expected, 5
  end

  def test_weight_between_output3
    expected = @graph.weight_between 'A', 'D', 'C'
    assert_equal expected, 13
  end

  def test_weight_between_output4
    expected = @graph.weight_between 'A', 'E', 'B', 'C', 'D'
    assert_equal expected, 22
  end

  def test_weight_between_output5
    expected = @graph.weight_between 'A', 'E', 'D'
    assert_equal expected, 'NO SUCH ROUTE'
  end

  def test_find_all_paths_max_k_output6
    expected = @graph.find_all_paths_max_k('C', 'C', 3).count
    assert_equal expected, 2
  end

  def test_find_all_paths_exactly_k_output7
    expected = @graph.find_all_paths_exactly_k('A', 'C', 4).count
    assert_equal expected, 3
  end

  def test_shortest_path_output8
    expected = @graph.shortest_path('A', 'C')
    assert_equal expected, 9
  end

  def test_shortest_path_output9
    expected = @graph.shortest_path('B', 'B')
    assert_equal expected, 9
  end

  def test_find_all_paths_max_w_output10
    expected = @graph.find_all_paths_max_w('C', 'C', 30).count
    assert_equal expected, 7
  end
end
