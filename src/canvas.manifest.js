export const manifest = {
  screens: {
    scr_o7b2co: { name: "Home", route: "/", position: { "x": 160, "y": 220 } },
    scr_o19pyo: { name: "Product Detail", route: "/product/cailmac-gel", position: { "x": 1560, "y": 220 } }
  },
  sections: {
    sec_sepj2l: { name: "Product Browsing", x: 0, y: 0, width: 2920, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_sepj2l", children: [
    { kind: "screen", id: "scr_o7b2co" },
    { kind: "screen", id: "scr_o19pyo" }]
  }]

};