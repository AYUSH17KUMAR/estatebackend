import Property from "../models/Property.js";

export const createProperty = async (req, res) => {
  const { title, description, price, location, images } = req.body;

  const property = new Property({
    title,
    description,
    price,
    location,
    images,
    user: req.user.id,
  });

  await property.save();
  res.status(201).json(property);
};

export const getProperties = async (req, res) => {
  const properties = await Property.find().populate("user", "name email");
  res.json(properties);
};
