# Origin Mosaic Simulator

An interactive simulation of how Celestron Origin plans and captures a mosaic.

**Live:** https://csasse123.github.io/origin-mosaic-simulator/

The current published version is the **b61 tutorial studio**, with StarSense AutoGuider on both mounts, SSAG-to-tube AUX2 wiring, an explicit mount AUX1-to-tube AUX1 coil, and refined equatorial-wedge hardware. New **StarSense guider** and **Wiring & AUX** presets expose the details. The orange axis logo, shell controls, detailed optics and original optical/mosaic calculations are preserved. See `B61_MODEL.md` for the photo/source audit and reconstruction limits.

Or download [origin_mosaic_simulator_b61.html](origin_mosaic_simulator_b61.html) and open it in any browser.
Single self-contained file — no install, no build step, no network access needed.

## Using it

- **01 · Telescope** opens the complete instrument, shell controls, mount selection and reference photographs.
- **StarSense guider** and **Wiring & AUX** show the accessory and labeled cable connections in either mount configuration.
- **04 · RASA optics** opens the optical diagram and detailed camera dissection.

- **Complete path** shows the assembled optical train; **Front optics ×4** exposes the three lenses, glass windows and sensor.
- **Explode diagram** separates the components; **Reassemble** restores optical alignment.
- **Camera dissection & capture controls** opens the detailed 678C views and filter drawer controls.
- **02 · Capture a tile** returns to the original mosaic workflow; **03 · Celestial sphere** opens the catalogue sky.

- **Play** runs the capture. Tiles light up one by one as they are exposed.
- **Box width / height** set the requested field; the tile count follows.
- **Mosaic orientation** and **camera angle on sky** set the grid and chip angles.
- **Follow the scope** switches to a merged view from the telescope's own axis.
- Two preset buttons load real capture runs — Andromeda (3x5) and Eastern Veil (4x5).

Built by Christian Sasse. Tutorial studio updated September 2026.

## Model notes (b55)

- Tile centres, tile count and the box orientation reproduce Origin's own plan
  (`CaptureMosaicTask` lines in the core log) to 0.01 arcmin. Grid step 0.59654°,
  columns = ceil(width / step), rows = ceil(height / step), orientation clockwise from north.
- Origin's camera is rolled 55° from the mount's altitude direction. The simulator adds
  this constant (`ORIGIN_CAM_ROLL`) to the kinematic field rotation, so the camera angle
  it reports is the number Origin writes as tile Orientation, and the default box
  orientation (Origin aligns the box to the camera) comes out the same. Session scatter
  is about ±1.5° (tripod levelling, polar alignment).
- The Veil preset is a wedge run: the chip stayed fixed on the sky while the parallactic
  angle moved 17°. It now loads in equatorial mode with the logged plan numbers.
- Full tile-by-tile comparison against the logs: see `VALIDATION.md`.
