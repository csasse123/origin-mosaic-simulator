# Origin Mosaic Simulator

An interactive tutorial for Celestron Origin mosaic capture, mount geometry and RASA optics.

**[Open the live simulator](https://csasse123.github.io/origin-mosaic-simulator/)**

The current published version is **B62**. Its default **Capture a tile + sky** view combines the telescope, one active tile, target imagery and 5,070 catalogue stars in one 3D scene. Orbit and zoom between the instrument, target and whole celestial sphere. Search 49 photographed targets, with quick buttons for Andromeda, the Pleiades, the Veil and Orion.

[Download the self-contained B62 HTML](origin_mosaic_simulator_b62.html) to open it directly without a build step, server or network connection.

## Using it

- **01 · Telescope** opens the complete instrument, shell transparency/removal, both mounts and reference photos. **StarSense guider** and **Wiring & AUX** expose the SSAG and cable connections.
- **02 · Capture a tile + sky** is the default. **Capture**, **Object** and **Full sky** frame different scales of the same scene. Drag to orbit and scroll to zoom; the 2D overview retains capture history.
- **03 · RASA optics** shows the optical path, three lenses, filter drawer and front-facing sensor. **Camera dissection & capture controls** exposes the 678C assembly. Exploding the optical train pauses the ray trace; reassembling restores it.
- **Play** advances the normal tutorial capture. Width, height and orientation controls retain the existing planning calculations. The Andromeda and Veil presets remain available.

See [B62_MODEL.md](B62_MODEL.md) for this revision and [B61_MODEL.md](B61_MODEL.md) for hardware references and reconstruction limits. Private log-authoring tools belong to the owner's separate Desktop copy and are not included in this public page.

Built by Christian Sasse. Updated September 2026.

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
