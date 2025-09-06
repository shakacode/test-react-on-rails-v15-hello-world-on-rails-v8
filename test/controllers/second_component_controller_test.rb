require "test_helper"

class SecondComponentControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get second_component_index_url
    assert_response :success
  end
end
