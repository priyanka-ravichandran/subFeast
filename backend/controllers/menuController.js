const menuModel = require('../models/menuModel');


// Fetch all menu items from the database
async function getMenuItems(req, res) {
  try {
    const menuItems = await menuModel.find(); // Fetch all items
    const transformedMenuItems = menuItems.map(item => {
      // Clone the item object
      const transformedItem = item.toObject();

      // Convert Decimal128 fields to strings (or numbers, as needed)
      if (transformedItem.price) {
        transformedItem.price = transformedItem.price.toString();
      }

      // Repeat for other Decimal128 fields as necessary

      return transformedItem;
    });

    console.log(transformedMenuItems);
    res.json(transformedMenuItems);

  } catch (error) {
    console.error('Failed to fetch menu items:', error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { getMenuItems };
