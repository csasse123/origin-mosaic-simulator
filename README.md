# Origin Mosaic Simulator

An interactive simulation of how Celestron Origin plans and captures a mosaic.

**Live:** https://csasse123.github.io/origin-mosaic-simulator/

Or download `origin_mosaic_simulator_b55.html` and open it in any browser.
Single self-contained file — no install, no build step, no network access needed.

## Using it

- **Play** runs the capture. Tiles light up one by one as they are exposed.
- **Box width / height** set the requested field; the tile count follows.
- **Mosaic orientation** and **camera angle on sky** set the grid and chip angles.
- **Follow the scope** switches to a merged view from the telescope's own axis.
- Two preset buttons load real capture runs — Andromeda (3x5) and Eastern Veil (4x5).

Built by Christian Sasse, August 2026.

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
