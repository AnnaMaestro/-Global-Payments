Feature: Checkout functionality

Scenario: Perform a checkout
    Given I am on the home page
    When I access the shop
    Then I should see the shop page
    When I filter for a category
    Then I should see the category page
    When I open a specific product page
    Then I should see the product page
    When I add the product to the cart
    Then I proceed to checkout
    Then I perform the checkout
    Then I review and confirm the payment
    Then I place the order

 Scenario: Perform an unsuccessful checkout
    Given I am on an unexpected home page
    When I access the wrong shop
    Then I should not see the shop page
    When I filter for a non-existent category
    Then I should not see the category page
    Then I should not access a specific product page
    When I proceed to checkout without adding any items to the cart
    Then I attempt to perform the checkout
    Then I attempt place the order
