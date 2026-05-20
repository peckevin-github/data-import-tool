'use strict';

var SystemObjectMgr = require('dw/object/SystemObjectMgr');
var ObjectTypeDefinition = require('dw/object/ObjectTypeDefinition');
var AttributeDefinition = require('dw/object/AttributeDefinition');

// Maps SFCC attribute value type constants to the type strings the XML builder uses
var VALUE_TYPE_MAP = {};
VALUE_TYPE_MAP[AttributeDefinition.VALUE_TYPE_STRING]           = 'String';
VALUE_TYPE_MAP[AttributeDefinition.VALUE_TYPE_INT]              = 'Integer';
VALUE_TYPE_MAP[AttributeDefinition.VALUE_TYPE_NUMBER]           = 'Number';
VALUE_TYPE_MAP[AttributeDefinition.VALUE_TYPE_BOOLEAN]          = 'Boolean';
VALUE_TYPE_MAP[AttributeDefinition.VALUE_TYPE_DATE]             = 'Date';
VALUE_TYPE_MAP[AttributeDefinition.VALUE_TYPE_DATETIME]         = 'Date+Time';
VALUE_TYPE_MAP[AttributeDefinition.VALUE_TYPE_EMAIL]            = 'Email';
VALUE_TYPE_MAP[AttributeDefinition.VALUE_TYPE_TEXT]             = 'HTML';
VALUE_TYPE_MAP[AttributeDefinition.VALUE_TYPE_HTML]             = 'HTML';
VALUE_TYPE_MAP[AttributeDefinition.VALUE_TYPE_IMAGE]            = 'Image';
VALUE_TYPE_MAP[AttributeDefinition.VALUE_TYPE_ENUM_OF_STRINGS]  = 'Enum of Strings';
VALUE_TYPE_MAP[AttributeDefinition.VALUE_TYPE_ENUM_OF_INTEGERS] = 'Enum of Integers';
VALUE_TYPE_MAP[AttributeDefinition.VALUE_TYPE_SET_OF_STRINGS]   = 'Set of Strings';
VALUE_TYPE_MAP[AttributeDefinition.VALUE_TYPE_SET_OF_INTEGERS]  = 'Set of Integers';
VALUE_TYPE_MAP[AttributeDefinition.VALUE_TYPE_SET_OF_NUMBERS]   = 'Set of Numbers';
VALUE_TYPE_MAP[AttributeDefinition.VALUE_TYPE_PASSWORD]         = 'Password';

/**
 * Attributes that are site-scoped for Product imports.
 * These render with a site-id attribute in the catalog XML.
 */
var PRODUCT_SITE_SPECIFIC = {
    'facebook-enabled-flag': true,
    'online-flag': true,
    'online-from': true,
    'online-to': true,
    'pinterest-enabled-flag': true,
    'search-placement': true,
    'search-rank': true,
    'searchable-flag': true,
    'searchable-if-unavailable-flag': true,
    'sitemap-changefrequency': true,
    'sitemap-included-flag': true,
    'sitemap-priority': true
};

/**
 * Attributes that are localizable for Product imports.
 */
var PRODUCT_LOCALIZABLE = {
    'display-name': true,
    'long-description': true,
    'page-description': true,
    'page-keywords': true,
    'page-title': true,
    'page-url': true,
    'short-description': true,
    'store-receipt-name': true
};

/**
 * Returns the canonical XML element name for a system attribute ID.
 * System object attribute IDs are already hyphenated in SFCC
 * (e.g. "online-flag", "display-name"), so we pass them through as-is.
 * Custom attributes use their raw ID inside <custom-attribute attribute-id="...">.
 */
function getXmlElementName(attrId, isSystem) {
    if (isSystem) {
        return attrId; // Already hyphenated by SFCC convention
    }
    return attrId; // Custom attrs use raw ID, not converted
}

/**
 * Fetches all attribute definitions for an object type and returns a
 * plain JSON-serialisable array. System attributes and custom attributes
 * are both included and flagged accordingly.
 *
 * @param {string} objectType  SFCC system object type (e.g. "Product")
 * @returns {Array} attribute descriptor objects
 */
function getAttributeDefinitions(objectType) {
    var typeDef = SystemObjectMgr.describe(objectType);
    if (!typeDef) {
        throw new Error('Unknown object type: ' + objectType);
    }

    var result = [];
    var attrDefs = typeDef.getAttributeDefinitions();

    var iter = attrDefs.iterator();
    while (iter.hasNext()) {
        var attr = iter.next();

        // Skip internal/read-only system attributes that can't be imported
        if (attr.system && !attr.writable) {
            continue;
        }

        var attrId     = attr.ID;
        var isSystem   = attr.system;
        var xmlElement = getXmlElementName(attrId, isSystem);
        var valueType  = VALUE_TYPE_MAP[attr.valueTypeCode] || 'String';

        // Build allowed values list for enum/set types
        var allowedValues = null;
        if (attr.valueTypeCode === AttributeDefinition.VALUE_TYPE_ENUM_OF_STRINGS ||
            attr.valueTypeCode === AttributeDefinition.VALUE_TYPE_ENUM_OF_INTEGERS ||
            attr.valueTypeCode === AttributeDefinition.VALUE_TYPE_SET_OF_STRINGS ||
            attr.valueTypeCode === AttributeDefinition.VALUE_TYPE_SET_OF_INTEGERS) {
            var vals = attr.values;
            if (vals && vals.length > 0) {
                allowedValues = [];
                for (var i = 0; i < vals.length; i++) {
                    allowedValues.push({
                        value: vals[i].value,
                        displayValue: vals[i].displayValue ? vals[i].displayValue.toString() : vals[i].value
                    });
                }
            }
        }

        // Display name falls back to the attribute ID when not localised
        var displayName = attr.displayName ? attr.displayName.toString() : attrId;

        result.push({
            id:             attrId,
            displayName:    displayName,
            xmlElement:     xmlElement,
            type:           valueType,
            system:         isSystem,
            mandatory:      attr.mandatory,
            localizable:    isSystem ? (PRODUCT_LOCALIZABLE[attrId] === true) : false,
            siteSpecific:   isSystem ? (PRODUCT_SITE_SPECIFIC[attrId] === true) : false,
            allowedValues:  allowedValues
        });
    }

    // Sort: system attributes first (alphabetically), then custom attributes
    result.sort(function (a, b) {
        if (a.system !== b.system) return a.system ? -1 : 1;
        return a.displayName.localeCompare(b.displayName);
    });

    return result;
}

module.exports = {
    getAttributeDefinitions: getAttributeDefinitions
};
