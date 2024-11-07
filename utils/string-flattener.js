const stringFlattener = (input) => {
  return input
    .toLowerCase() // Convert to lowercase
    .normalize("NFD") // Normalize to decompose accents
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/ /g, "-") // Replace spaces with dashes
    .replace(/[^a-z0-9-]/g, ""); // Remove any remaining non-alphanumeric characters except dashes
};

module.exports = {
  stringFlattener,
};
