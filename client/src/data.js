import React from 'react';

// PASTE IT HERE (Top of file, outside the component)
export const PORTFOLIO_ITEMS = [
  { "id": 2, "image": "1000259044 (1).jpg", "title": "Luxury Velvet Living Room Drapes", "category": "Curtains" },
  { "id": 3, "image": "1000259047 (2).jpg", "title": "Sheer Voile Layering", "category": "Sheers" },
  { "id": 4, "image": "1000259050 (1).jpg", "title": "Pinch Pleat Master Bedroom", "category": "Curtains" },
  { "id": 5, "image": "1000259053 (1).jpg", "title": "Sliding Balcony Insect Screen", "category": "Mosquito Mesh" },
  { "id": 6, "image": "1000259056 (1).jpg", "title": "Pleated Accordion Door Net", "category": "Mosquito Mesh" },
  { "id": 7, "image": "1000259059 (1).jpg", "title": "100% Thermal Blackout Sanctuary", "category": "Blackout" },
  { "id": 8, "image": "1000259062 (1).jpg", "title": "Grommet Eyelet Living Drapes", "category": "Curtains" },
  { "id": 9, "image": "1000259065 (1).jpg", "title": "Linen Sheer Sunroom Panel", "category": "Sheers" },
  { "id": 10, "image": "1000259071 (1).jpg", "title": "Magnetic Window Netting", "category": "Mosquito Mesh" },
  { "id": 11, "image": "1000259074 (1).jpg", "title": "Darkening Theater Room Drapes", "category": "Blackout" },
  { "id": 12, "image": "1000259077 (1).jpg", "title": "Classic Royal Velvet Drapes", "category": "Curtains" },
  { "id": 13, "image": "1000259080 (1).jpg", "title": "Soft White Sheer Curtains", "category": "Sheers" },
  { "id": 14, "image": "1000259086 (1).jpg", "title": "Heavy Duty Balcony Mosquito Net", "category": "Mosquito Mesh" },
  { "id": 15, "image": "1000259091 (1).jpg", "title": "Motorized Blackout Shades", "category": "Blackout" },
  { "id": 16, "image": "1000259095 (1).jpg", "title": "Ripplefold Hotel-Style Drapes", "category": "Curtains" },
  { "id": 17, "image": "1000259096 (1).jpg", "title": "Translucent Embroidered Sheers", "category": "Sheers" },
  { "id": 18, "image": "1000259099 (1).jpg", "title": "French Door Insect Screen", "category": "Mosquito Mesh" },
];

export default function Portfolio() {
  return (
    <div>
      {PORTFOLIO_ITEMS.map(item => (
        <div key={item.id}>
          <img src={`/images/${item.image}`} alt={item.title} />
          <h3>{item.title}</h3>
        </div>
      ))}
    </div>
  );
}