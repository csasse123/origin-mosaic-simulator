# Origin tutorial studio b61 — StarSense, AUX wiring and equatorial wedge

This revision adds the StarSense AutoGuider to both mount configurations, explicitly connects mount AUX1 to optical-tube AUX1, and connects SSAG AUX to optical-tube AUX2. It refines the equatorial wedge using the six newly supplied references. The orange Celestron axis emblem remains present as requested.

## Reference audit

| Reference | Evidence used | Result |
| --- | --- | --- |
| IMG_3238.HEIC | Rear cell, side cooling intake, mount on wedge | Rear-cell accessory context and wedge proportions |
| Supplied AUX1 close-up | Labeled AUX1 sockets at both ends, modular plugs, coiled cable, ferrite | Explicit AUX1-to-AUX1 connection, plug latches and contacts, strain relief, ferrite at the photographed tube end |
| IMG_9028 3.jpg | Complete wedge and SSAG installation | Large rear-cell bracket, parallel SSAG optical axis, wedge plate and side-casting layout |
| IMG_9027 3.jpg | Open side castings, star-shaped knobs and threaded latitude adjuster | Perforated castings, raised reinforcing webs, metal fasteners, latitude adjustment rod and knobs |
| Supplied SSAG product image | Front shade, orange trim, clamp band, bracket and rear rim | Barrel contours, recessed entrance glass, front threads and lettering, rear AUX/USB-C openings, status diffuser |
| Supplied complete SSAG/wedge setup | Bracket position and separate accessory cable | SSAG connected to tube AUX2 with a separate flexible lead |

The standalone file contains 26 reference photographs, including all six new images and the eleven previous owner close-ups. Compressed viewing copies are embedded; the original reference files remain unchanged.

## Published sources

- [Celestron StarSense AutoGuider specifications](https://www.celestron.com/products/starsense-autoguider): 185.42 mm body length, 58.42 mm diameter, 28 mm effective aperture, AUX and USB-C connections. The body geometry uses that published envelope. The recessed visible entrance glass is represented separately from the stated effective aperture.
- [Origin instruction manual, Appendix E](https://celestron-site-support-files.s3.dualstack.us-east-1.amazonaws.com/support_files/12100_Origin_Instruction%20Manual-5_Languages-102425.pdf): large SSAG bracket on the rear cell; the optical-tube AUX connection is recommended for the shortest cable route. The chosen port is AUX2, as requested by the owner.
- [StarSense AutoGuider instruction manual](https://www.celestron.de/downloads/dl/file/id/1938/starsense-autoguider-instruction-manual.pdf): bracket, base, mounting and rear-port illustrations.
- [Celestron wedge #93665](https://www.celestron.com/products/equatorial-wedge-for-the-nexstar-se-nexstar-evolution-and-celestron-origin) and [wedge assembly manual](https://celestron-site-support-files.s3.amazonaws.com/support_files/93665_Celestron_NexStar_Wedge_Manual_Eng_Web.pdf): tilt plate, side castings, locking knobs, swivel bar, latitude rod and azimuth adjustment hardware; supported latitude range 0–70 degrees.

## Model behavior

**SSAG:** An independent fitted-accessory control adds or removes both the guider and its AUX2 lead. It remains opaque when the Origin tube is transparent or removed and is hidden in the enlarged RASA optical-dissection scene. The large bracket has a slotted base, screw heads, angled open web, clamp band and knurled thumbscrews. Its optical axis follows the OTA in both Alt-Az and equatorial modes. It does not introduce a guiding solver or modify the pointing calculations.

**AUX wiring:** The fork's AUX panel now faces the photographed rear edge. Each plug is anchored to an actual socket object. The SSAG's separate lead runs from its rear AUX port to tube AUX2. The main coiled lead connects tube AUX1 and mount AUX1, bends around the fork, and changes its bend at steep altitude to avoid penetrating the mount. Coil frames are transported continuously along the guide curve. The ferrite follows the owner's photograph at the tube end. Cable shapes are visual reconstructions, not a cable-elasticity simulation.

**Wedge:** Fixed perforated side castings remain rigid while the tilt plate rotates about their shared hinge. The orange lower swivel bar projects beyond the base plate so the latitude rod clears the plate. The rod has a constant reconstructed physical length of 345 mm, with its sliding extent following the tilt plate's upper swivel. This length and the small casting dimensions are photo-derived estimates. Star-shaped locking and adjustment knobs, azimuth controls, washers, bolts, the green level, plate ribs, a 0–70 degree scale and moving pointers are included.

The visible EQ hinge is raised by 59 mm relative to b60 to locate it above the tripod plate and connect the fixed castings to the rotating plate. This is a mechanical presentation translation only. Switching back to Alt-Az restores the previous flat-base height. The original mount angles, sky orientation, sensor-facing direction, mosaic calculations, 55-degree camera clocking and reconstructed RASA prescription remain unchanged.

**Inspection:** New **StarSense guider** and **Wiring & AUX** presets work in both mount modes. Four on-screen socket callouts identify Mount AUX1, Tube AUX1, Tube AUX2 and SSAG AUX in the wiring view. The callouts follow their actual socket positions. Existing shell, dew-shield, ray, exploded-camera and image-formation controls remain available.

## Precision limits

This is a photograph-based reconstruction with published envelope dimensions, not Celestron factory CAD. Unpublished casting contours, connector details, internal SSAG optics and exact hardware dimensions have not been measured. No SSAG internal optical prescription or autoguiding performance is represented. Wedge linkage and cable-clearance checks verify this model's sampled configurations; they do not certify physical telescope clearances throughout every possible slew or replace the manufacturer’s assembly instructions. The existing optical model retains its earlier stated reconstruction limits.

## Validation and delivery

`B61_VALIDATION.json` records 49 passing checks across the regression, hardware, owner-photo, accessory and cable-clearance suites. These include:

- 34 original calculation/state definitions unchanged, and 16 complete mosaic plan snapshots matching b55 bit for bit.
- 400 independent optical-ray samples checking surface intersections, reflection, Snell's law, focal-plane image scale and the sensor facing the primary.
- The single-active-tile display and the original 5,070-star celestial sphere.
- 24 mount-axis configurations and 24 accessory/cable attachment configurations, plus the existing 18 owner-photo cable states.
- Cable mesh end rings coinciding with their plug exits; SSAG alignment, body envelope and cable clearance from the tube.
- Rigid wedge castings, coincident hinge centers, constant rod length, aligned swivel connections, correct scale pointers and base clearance at 15 latitudes from 0 to 70 degrees.
- An additional cable centerline intersection check against the actual fork and base meshes in 18 sampled poses, with 150 segments per pose.
- Reversible shell and SSAG controls, four socket callouts in both mount modes, all 26 embedded references, camera dissection, ground contact of all three feet, finite geometry and laptop panel layouts.
- Offline headless Chrome execution without JavaScript/WebGL errors or remote requests. Rendered whole-instrument, SSAG, wiring, wedge, rear, front and optics screenshots were visually reviewed.

The public entry point is `index.html`, with an identical versioned download in `origin_mosaic_simulator_b61.html`. The public copy removes location and other incidental photograph metadata while retaining orientation and image pixels. The simulator code and visible image content match the tested local b61 artifact. `B61_VALIDATION.json` records both source and public hashes and the metadata-only equivalence check. Earlier b55 remains available in the repository.

## Optical reconstruction retained from b58

The optical diagram has three modeled lens elements, a broad Schmidt corrector, a spherical primary, the removable clear optical window/filter, a camera window and a forward sensor facing the primary. Its three pale-green ray samples reflect and refract on the same analytic surfaces used by the geometry. Object distance is compressed for teaching. Exploding the optical train suspends the trace until reassembly; opening only the camera leaves the chip and optical glass aligned.

`b58_reconstructed_optics.json` is a fitted monochromatic 550 nm teaching prescription. Celestron’s proprietary Origin glass choices, curvatures and exact optical spacings were not available in the reviewed material. Correct reflection and Snell-law calculations do not establish that proprietary prescription, nor predict the real instrument’s image quality. Diffraction, dispersion, detector radiometry and manufacturing tolerances are not modeled. Sensor noise, microlens appearance and arrow timing are illustrative.

Optical references are included in the simulator’s Sources & model limits dialog, including [Celestron Origin technology](https://www.celestron.com/pages/celestron-origin-technology), [the 6-inch RASA description](https://www.celestron.com/products/advanced-vx-6-rowe-ackermann-schmidt-astrograph-rasa-telescope), and [Origin 678C specifications](https://www.celestron.com/products/celestron-origin-678c-camera).
