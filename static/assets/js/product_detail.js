$(document).ready(function () {
    function AttributeValueModel(sku, attributeId, attributeValueId) {
        this.sku = sku;
        this.attribute_Id = attributeId;
        this.attribute_value_Id = attributeValueId;
    }

    function ProductModel() {
        var self = this;

        self.onAttributeValueClick = function (selectedAttributeValue) {
            if (!selectedAttributeValue.isAvailable())
                return;

            setSelected(selectedAttributeValue);

            //collect all attribute and values for all variants
            var availableVariants = getAllVariantsByAttributeValueId(selectedAttributeValue.attribute_value_id());
            var attributeValueList = [];
            availableVariants.forEach(function (variant) {
                variant.attributes.forEach(function (item) {
                    attributeValueList.push(new AttributeValueModel(variant.sku, item.attribute_id, item.attribute_value_id))
                });
            });

            self.attributes().forEach(function (attribute) {
                if (attribute.attribute_id() != selectedAttributeValue.attribute_id()) {
                    attribute.values().forEach(function (attributeValue) {
                        attributeValue.isAvailable(false);
                        attributeValueList.forEach(function (availableAttributeValue) {
                            if (attributeValue.attribute_value_id() == availableAttributeValue.attribute_value_Id) {
                                attributeValue.isAvailable(true);
                                attributeValue.sku(availableAttributeValue.sku);
                            }
                        });
                    })
                }
            });
        }

        function setSelected(selectedAttributeValue) {
            var isSelected = !selectedAttributeValue.isSelected();
            self.attributes().forEach(function (attribute) {
                if (selectedAttributeValue.attribute_id() == attribute.attribute_id()) {
                    attribute.values().forEach(function (item) {
                        item.isSelected(false);
                    });
                }
            });
            selectedAttributeValue.isSelected(isSelected);
        }

        function getAllVariantsByAttributeValueId(attributeValueId) {
            var availableVariants = [];
            for (i in self.variants) {
                for (y in self.variants[i].attributes) {
                    if (self.variants[i].attributes[y].attribute_value_id == attributeValueId) {
                        availableVariants.push(self.variants[i]);
                        break;
                    }
                }
            }
            return availableVariants;
        }

        self.attributes = [];

        self.attributesObject = [
            {
                "attribute_id": "5",
                "name": "TOP MEN'S STYLES",
                "values": [
                    {
                        "attribute_value_id": "19",
                        "attribute_id": "5",
                        "sku": "",
                        "name": "Sneakers",
                        "class_name": "p_size",
                        "isAvailable": true,
                        "show_name": true,
                        "isSelected": false
                    },
                    {
                        "attribute_value_id": "20",
                        "attribute_id": "5",
                        "sku": "",
                        "name": "Dress Shoes",
                        "class_name": "p_size",
                        "isAvailable": true,
                        "show_name": true,
                        "isSelected": false
                    },
                    {
                        "attribute_value_id": "21",
                        "attribute_id": "5",
                        "sku": "",
                        "name": "Athletic",
                        "class_name": "p_size",
                        "isAvailable": true,
                        "show_name": true,
                        "isSelected": false
                    }
                ]
            },
            {
                "attribute_id": "3",
                "name": "Size",
                "values": [
                    {
                        "attribute_value_id": "3",
                        "attribute_id": "3",
                        "sku": "",
                        "name": "39",
                        "class_name": "p_size",
                        "isAvailable": true,
                        "show_name": true,
                        "isSelected": false
                    },
                    {
                        "attribute_value_id": "6",
                        "attribute_id": "3",
                        "sku": "",
                        "name": "42",
                        "class_name": "p_size",
                        "isAvailable": true,
                        "show_name": true,
                        "isSelected": false
                    },
                    {
                        "attribute_value_id": "5",
                        "attribute_id": "3",
                        "sku": "",
                        "name": "41",
                        "class_name": "p_size",
                        "isAvailable": true,
                        "show_name": true,
                        "isSelected": false
                    },
                    {
                        "attribute_value_id": "7",
                        "attribute_id": "3",
                        "sku": "",
                        "name": "43",
                        "class_name": "p_size",
                        "isAvailable": true,
                        "show_name": true,
                        "isSelected": false
                    }
                ]
            },
            {
                "attribute_id": "4",
                "name": "Color",
                "values": [
                    {
                        "attribute_value_id": "12",
                        "attribute_id": "4",
                        "sku": "",
                        "name": "Красный",
                        "class_name": "p_red",
                        "isAvailable": true,
                        "show_name": false,
                        "isSelected": false
                    },
                    {
                        "attribute_value_id": "14",
                        "attribute_id": "4",
                        "sku": "",
                        "name": "Чёрный",
                        "class_name": "p_green",
                        "isAvailable": true,
                        "show_name": false,
                        "isSelected": false
                    },
                    {
                        "attribute_value_id": "18",
                        "attribute_id": "4",
                        "sku": "",
                        "name": "Серый",
                        "class_name": "p_yellow",
                        "isAvailable": true,
                        "show_name": false,
                        "isSelected": false
                    }
                ]
            }
        ];

        self.variants = [
            {
                "id": "1",
                "name": "",
                "sku": "00102272019",
                "retail_price": "15.00",
                "discount_price": "",
                "quantity": "11",
                "attributes": [
                    {
                        "attribute_id": "3",
                        "attribute_value_id": "6",
                    },
                    {
                        "attribute_id": "3",
                        "attribute_value_id": "3",
                    },
                    {
                        "attribute_id": "3",
                        "attribute_value_id": "5",
                    },
                    {
                        "attribute_id": "4",
                        "attribute_value_id": "18",
                    },
                    {
                        "attribute_id": "5",
                        "attribute_value_id": "19",
                    }
                ],
                "images": [
                    {
                        "image": "",
                        "order_number": ""
                    },
                    {
                        "image": "",
                        "order_number": ""
                    }]

            },
            {
                "id": "2",
                "name": "",
                "sku": "00202272019",
                "retail_price": "15.30",
                "discount_price": "",
                "quantity": "11",
                "attributes": [
                    {
                        "attribute_id": "3",
                        "attribute_value_id": "5",
                    },
                    {
                        "attribute_id": "3",
                        "attribute_value_id": "3",
                    },
                    {
                        "attribute_id": "3",
                        "attribute_value_id": "7",
                    },
                    {
                        "attribute_id": "4",
                        "attribute_value_id": "12",
                    },
                    {
                        "attribute_id": "5",
                        "attribute_value_id": "20",
                    }],
                "images": [
                    {
                        "image": "",
                        "order_number": ""
                    },
                    {
                        "image": "",
                        "order_number": ""
                    }],

            },
            {
                "id": "5",
                "name": "",
                "sku": "00302272019",
                "retail_price": "15.20",
                "discount_price": "",
                "quantity": "12",
                "attributes": [
                    {
                        "attribute_id": "3",
                        "attribute_value_id": "6",
                    },
                    {
                        "attribute_id": "4",
                        "attribute_value_id": "14",
                    },
                    {
                        "attribute_id": "5",
                        "attribute_value_id": "21",
                    }],
                "images": [
                    {
                        "image": "",
                        "order_number": ""
                    },
                    {
                        "image": "",
                        "order_number": ""
                    }],

            }
        ];
    }

    var attributesJson_FromServer = "[\n" +
        "            {\n" +
        "                \"attribute_id\": \"5\",\n" +
        "                \"name\": \"TOP MEN'S STYLES\",\n" +
        "                \"values\": [\n" +
        "                    {\n" +
        "                        \"attribute_value_id\": \"19\",\n" +
        "                        \"attribute_id\": \"5\",\n" +
        "                        \"sku\": \"\",\n" +
        "                        \"name\": \"Sneakers\",\n" +
        "                        \"class_name\": \"p_size\",\n" +
        "                        \"isAvailable\": true,\n" +
        "                        \"show_name\": true,\n" +
        "                        \"isSelected\": false\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"attribute_value_id\": \"20\",\n" +
        "                        \"attribute_id\": \"5\",\n" +
        "                        \"sku\": \"\",\n" +
        "                        \"name\": \"Dress Shoes\",\n" +
        "                        \"class_name\": \"p_size\",\n" +
        "                        \"isAvailable\": true,\n" +
        "                        \"show_name\": true,\n" +
        "                        \"isSelected\": false\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"attribute_value_id\": \"21\",\n" +
        "                        \"attribute_id\": \"5\",\n" +
        "                        \"sku\": \"\",\n" +
        "                        \"name\": \"Athletic\",\n" +
        "                        \"class_name\": \"p_size\",\n" +
        "                        \"isAvailable\": true,\n" +
        "                        \"show_name\": true,\n" +
        "                        \"isSelected\": false\n" +
        "                    }\n" +
        "                ]\n" +
        "            },\n" +
        "            {\n" +
        "                \"attribute_id\": \"3\",\n" +
        "                \"name\": \"Size\",\n" +
        "                \"values\": [\n" +
        "                    {\n" +
        "                        \"attribute_value_id\": \"3\",\n" +
        "                        \"attribute_id\": \"3\",\n" +
        "                        \"sku\": \"\",\n" +
        "                        \"name\": \"39\",\n" +
        "                        \"class_name\": \"p_size\",\n" +
        "                        \"isAvailable\": true,\n" +
        "                        \"show_name\": true,\n" +
        "                        \"isSelected\": false\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"attribute_value_id\": \"6\",\n" +
        "                        \"attribute_id\": \"3\",\n" +
        "                        \"sku\": \"\",\n" +
        "                        \"name\": \"42\",\n" +
        "                        \"class_name\": \"p_size\",\n" +
        "                        \"isAvailable\": true,\n" +
        "                        \"show_name\": true,\n" +
        "                        \"isSelected\": false\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"attribute_value_id\": \"5\",\n" +
        "                        \"attribute_id\": \"3\",\n" +
        "                        \"sku\": \"\",\n" +
        "                        \"name\": \"41\",\n" +
        "                        \"class_name\": \"p_size\",\n" +
        "                        \"isAvailable\": true,\n" +
        "                        \"show_name\": true,\n" +
        "                        \"isSelected\": false\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"attribute_value_id\": \"7\",\n" +
        "                        \"attribute_id\": \"3\",\n" +
        "                        \"sku\": \"\",\n" +
        "                        \"name\": \"43\",\n" +
        "                        \"class_name\": \"p_size\",\n" +
        "                        \"isAvailable\": true,\n" +
        "                        \"show_name\": true,\n" +
        "                        \"isSelected\": false\n" +
        "                    }\n" +
        "                ]\n" +
        "            },\n" +
        "            {\n" +
        "                \"attribute_id\": \"4\",\n" +
        "                \"name\": \"Color\",\n" +
        "                \"values\": [\n" +
        "                    {\n" +
        "                        \"attribute_value_id\": \"12\",\n" +
        "                        \"attribute_id\": \"4\",\n" +
        "                        \"sku\": \"\",\n" +
        "                        \"name\": \"Красный\",\n" +
        "                        \"class_name\": \"p_red\",\n" +
        "                        \"isAvailable\": true,\n" +
        "                        \"show_name\": false,\n" +
        "                        \"isSelected\": false\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"attribute_value_id\": \"14\",\n" +
        "                        \"attribute_id\": \"4\",\n" +
        "                        \"sku\": \"\",\n" +
        "                        \"name\": \"Чёрный\",\n" +
        "                        \"class_name\": \"p_green\",\n" +
        "                        \"isAvailable\": true,\n" +
        "                        \"show_name\": false,\n" +
        "                        \"isSelected\": false\n" +
        "                    },\n" +
        "                    {\n" +
        "                        \"attribute_value_id\": \"18\",\n" +
        "                        \"attribute_id\": \"4\",\n" +
        "                        \"sku\": \"\",\n" +
        "                        \"name\": \"Серый\",\n" +
        "                        \"class_name\": \"p_yellow\",\n" +
        "                        \"isAvailable\": true,\n" +
        "                        \"show_name\": false,\n" +
        "                        \"isSelected\": false\n" +
        "                    }\n" +
        "                ]\n" +
        "            }\n" +
        "        ]";

    // model = new ProductModel();
    // model.attributes = ko.wrap.fromJS(JSON.parse(attributesJson_FromServer));
    // ko.applyBindings(model, document.getElementById('product_details'));
});
