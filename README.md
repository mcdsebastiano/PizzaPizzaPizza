# Pizza Menu

Menu & Cart Inventory system specifically designed for a Pizza Restaurant. All that's needed is to build the menu and the rest will manage itself. Add new items & categories, modify prices and photos from one file & the menu will automatically update.

#### Features:
- Menu & Items displayed automatically; All menu updates are immediate.
- Custom prices and dynamic price selector.
- Inventory/Cart system (add/remove/update quantity.)
- Customizable Pizzas (mods, toppings, etc.)
- Modular templates/components.
- Integrated Stripe payment platform.
<br> 

### Menu Format

---
#### Categories
The only required Categories are Pizzas and Options, feel free to add as many different Categories as you like:
```json
{
  "Pizzas": {},
  "Sides": {},
  "Salads": {},
  "Beverages": {},
  "Options": {
    "..."
  }
}
```
#### Items
Defining a non-pizza item is fairly straight forward:
```json
"An Item": {
  "Description": "Item Description",
  "Image": "/path/to/menu/img.jpg",
  "Price": {
    "Size": "0.00"
  }
}
```

If there is <b> NO DEFINED  size, or the size is determined by the house</b>, such as in the case of certain Sides/Salads or Side Sauces, the Price field should be indexed as an Array in order to preserve consistency and ensure a working inventory. i.e:

```json
  "Price": ["0.00"]
```

Defining a pizza is a bit more involved:

```json
"A Pizza": {
  "Options": {
    "Crust": "Crust::Type",
    "Sauce": ["Sauce::Type", "Sauce::Mod::Option"],
    "Cheese": "Cheese::Mod::Option",
    "Toppings": {
      "Whole": [],
      "Left": [],
      "Right": []
    }
  },
  "Description": "Item Description",
  "Image": "/path/to/menu/img.jpg",
  "Price": {
    "Size": "0.00"
  }
}
```

#### Options

The Options Object within "A Pizza" should follow the same format as the Options Category you defined inside menu.json (see below). It's important to use the same fields when creating a pizza. <b>Crust, Sauce, Cheese and Toppings are required.</b><br>
```json
"Options": {
  "Crust": {
    "{Type}": {
      "Price": {
        "{Size}": "0.00"
      }
    }
  },
  "Sauce": {
    "{Type}": {
      "Price": {
        "{Size}": "0.00"
      }
    },
    "Mod": {
      "{Option}": {
        "Price": {
          "{Size}": "0:00"
        }
      }
    }
  },
  "Cheese": {
    "Mod": {
      "{Option}": {
        "Price": {
          "{Size}": "0.00"
        }
      }
    }
  },
  "Toppings": {
    "{Type}": {
      "List": [],
      "Price": {
        "{Size}": "0.00"
      }
    }
  }
}
```


\{Type}, \{Option}, and \{Size} are examples of custom repeatable fields (there can be as many as you need/want). <br>
i.e Topping Types can be "Regular and "Premium", each containing separate lists of toppings, and separate prices varied per type and size. Another example would be alternate Crust and Sauce Types. <br>
If a field contains "Mod", thats where item modifier options such as "Light", "Regular" or "Extra" should be listed. Prices can be set per option, per size.
#### NOTE:
- Toppings List is an array of strings; a topping of that type to be used when defining a new pizza.
- Toppings Portion Arrays (Left, Whole, Right) are used to portion the pizzas toppings upon definition. All three should be present, even if they are empty.

See the sample menu.json as a working example.

TODO:
- [ ] Better payment handling; A custom flow.
- [ ] Dynamic, user-friendly, menu editor.
- [ ] Collapse edited cart items into existing items if they are the same after editing.
