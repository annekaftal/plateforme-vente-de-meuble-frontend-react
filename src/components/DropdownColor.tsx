"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


interface DropdownColorProps {
  handleColorChange: (types: string[]) => void;
}

function DropdownColor
({ handleColorChange }: DropdownColorProps) {

  // group all items in an object, associate a boolean for state management
  const [checkedItems, setCheckedItems] = React.useState<{ [key: string]: boolean }>({
    blue: false,
    brown: false,
    black: false,
    white: false,
    red: false,
    grey: false
  });

  // associate display values with values declared in db
  const itemsMap = {
    blue: { display: "Bleu", value: "bleu" },
    brown: { display: "Marron", value: "marron" },
    black: { display: "Noir", value: "noir" },
    white: { display: "Blanc", value: "blanc" },
    red: { display: "Rouge", value: "rouge" },
    grey: { display: "Gris", value: "gris" }
  };

  // manage check logic
  const handleCheckedChange = (key: string, checked: boolean) => {
    // update checkedItems state with new checked item
    const newCheckedItems = {
      ...checkedItems,
      [key]: checked
    };
    setCheckedItems(newCheckedItems);

    // get selected categories:
    // convert {key: value} to [key, value]
    const selectedColors = Object.entries(newCheckedItems)
    // keep only truthy item
      .filter(([_, isChecked]) => isChecked)
    // get db exact name for each checked item
      .map(([key]) => itemsMap[key].value);
    // update category wuth new selected items
    handleColorChange(selectedColors);
  };

  // count selected items
  const selectedCount = Object.values(checkedItems).filter(Boolean).length;
  const buttonLabel = selectedCount > 0 
    ? `Couleur (${selectedCount}) ▾` 
    : "Couleur ▾";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="min-w-32" variant="outline">{buttonLabel}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* generate a selector for each item in itemsMap */}
        {Object.entries(itemsMap).map(([key, { display }]) => (
          <DropdownMenuCheckboxItem
            key={key}
            checked={checkedItems[key]}
            onCheckedChange={(checked) => handleCheckedChange(key, checked as boolean)}
          >
            {display}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DropdownColor
