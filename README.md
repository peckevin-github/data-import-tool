# Salesforce B2C Commerce Data Import Tool

A streamlined, browser-based tool for importing data into Salesforce B2C Commerce Business Manager. This tool simplifies the process of creating properly formatted XML import files through an intuitive three-step workflow.

## 🎯 Purpose

This tool eliminates the complexity of manually creating XML import files for Salesforce B2C Commerce by providing:
- Pre-configured templates for various object types
- Automatic XML generation from CSV data
- Support for standard and custom attributes
- Built-in validation and formatting

## ✨ Features

- **Browser-Based**: No installation required - runs entirely in your browser
- **Multi-Type Support**: Handles products, categories, content, customers, and more
- **Custom Attributes**: Add custom attributes specific to your implementation
- **Locale Support**: Configure locale-specific and site-specific data
- **Bulk Delete**: Clear attribute values by leaving cells blank in the CSV
- **Drag & Drop**: Easy file upload with drag-and-drop support
- **Modern UI**: Clean, responsive interface built with Tailwind CSS

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Basic understanding of Salesforce B2C Commerce data structure
- CSV editor (Excel, Google Sheets, or text editor)

### Usage

Simply open the `Data Import Tool.html` file in your web browser to get started.

## 📋 Three-Step Process

### Step 1: Select Import Type

Choose the type of data you want to import from the available categories:

#### Product
- **Product Attributes** - Standard and custom product attributes
- **Variation Mappings** - Product variation relationships
- **Recommendations** - Product recommendations
- **Image Mappings** - Product image associations
- **Variation Groups** - Variation group configurations
- **Prices** - Product pricing data
- **Inventory** - Inventory levels and availability
- **Product Sets** - Product set definitions

#### Category
- **Category Attributes** - Category properties and metadata
- **Category Assignments** - Product-to-category assignments
- **Category Position** - Product positioning within categories

#### Content
- **Content Assets** - Content asset properties
- **Library Folders** - Content library folder structure

#### Customer Groups
- **Customers** - Customer data
- **Static Customer Group** - Static customer group memberships

#### Coming Soon
- Search refinements
- Categorization rules
- On-site Search configurations
- Online Marketing data
- SEO settings

### Step 2: Generate CSV Template

1. **Select Attributes**: Choose from standard attributes or add custom attributes
2. **Configure Options**: 
   - Specify locale codes (e.g., `en_US`, `fr_FR`)
   - Set site-specific attributes
   - Configure catalog IDs where applicable
3. **Generate Template**: Download your customized CSV template
4. **Populate Data**: Fill in your data using your preferred CSV editor

**💡 Pro Tip**: Leave an attribute value blank in the CSV to delete/clear that attribute value in Business Manager.

### Step 3: Convert CSV to XML

1. **Enter Configuration**: Provide required IDs (Catalog ID, List ID, etc.)
2. **Upload CSV**: Drag and drop or select your populated CSV file
3. **Generate XML**: Click "Generate XML File" to create your import-ready XML
4. **Import to Business Manager**: Use the generated XML in your Business Manager import process

## 🛠️ Technical Details

### Built With

- **HTML5/JavaScript**: Core application logic
- **Tailwind CSS**: Modern, responsive styling
- **PapaParse**: CSV parsing library
- **Salesforce Sans**: Official Salesforce typography

### File Format

The tool generates XML files compliant with Salesforce B2C Commerce import specifications, including:
- Proper XML structure and namespaces
- Catalog-specific formatting
- Locale and site-specific data handling
- Custom attribute support

## 📖 Use Cases

### Product Management
- Bulk update product descriptions, names, and attributes
- Update pricing across multiple products
- Manage inventory levels
- Configure product variations
- Set up product recommendations

### Category Management
- Update category hierarchies
- Bulk assign products to categories
- Configure category positions
- Update category metadata

### Content Management
- Import content assets
- Organize content library structure
- Update content asset properties

### Customer Data
- Import customer records
- Manage customer group memberships

## ⚠️ Important Notes

- **Backup First**: Always backup your data before performing bulk imports in Business Manager
- **Catalog IDs**: Ensure you use the correct Catalog ID for your environment
- **Data Validation**: Review your CSV data carefully before generating XML
- **Custom Attributes**: Make sure custom attributes exist in your system definition before importing
- **Browser Compatibility**: Use a modern browser for the best experience

## 💾 Data Privacy

This tool processes all data locally in your browser. No data is uploaded to external servers.

## 🤝 Contributing

This tool is designed to be extensible. Future enhancements may include:
- Additional object type support
- Advanced validation rules
- Import templates for common scenarios
- Batch processing capabilities

## 📝 Best Practices

1. **Start Small**: Test with a small data set first
2. **Use Standard Attributes**: Leverage standard attributes when possible
3. **Document Custom Attributes**: Keep track of custom attributes used
4. **Validate Data**: Review generated XML before importing
5. **Test in Sandbox**: Always test imports in a non-production environment first

## 🆘 Troubleshooting

### CSV Won't Upload
- Ensure the file is in CSV format (not Excel .xlsx)
- Check that the file isn't corrupted
- Try saving the CSV with UTF-8 encoding

### XML Generation Fails
- Verify all required fields are populated
- Check for special characters that need escaping
- Ensure Catalog ID is provided for catalog-based imports

### Import Fails in Business Manager
- Validate XML structure against B2C Commerce specifications
- Check for attribute name mismatches
- Verify catalog IDs match your environment
- Ensure custom attributes are defined in system definitions

## 📄 License

Please refer to your organization's licensing terms for Salesforce B2C Commerce tools and utilities.

## 👤 Author

Created by Kevin Peck for  Salesforce B2C Commerce administrators and architects to streamline data import workflows.

---

**Note**: This tool is designed to assist with Salesforce B2C Commerce data imports. Always follow your organization's data governance and change management procedures when importing data to production environments.

