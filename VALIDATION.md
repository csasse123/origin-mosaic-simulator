# Validation of the Origin mosaic simulator against Origin core logs

Source of truth: `originCoreLog_*.txt` (`CaptureMosaicTask.cpp` plan lines and
`ImagingTask.cpp` "Saved RA/Dec/Orientation" lines) plus the FITS headers of the
saved lights. Simulator: b55, driven with the logged centre, box, orientation,
latitude and the hour angle of the first exposure.

## 1. Tile centres (plan vs simulator)

| Run | Grid | Orientation | Worst tile-centre error |
|---|---|---|---|
| Andromeda set 1, 2026-09-08 21:02 | 3×2 | 230.9458° | 0.00′ |
| Andromeda set 2, 2026-09-08 22:35 | 3×2 | 237.2358° | 0.00′ |
| Andromeda (aborted), 2026-09-08 22:20 | 3×2 | 57.0890° | 0.00′ |
| Pleiades, 2026-09-09 00:04 | 3×3 | 168.9315° | 0.01′ |
| Andromeda 3×5, 2026-08-20 23:17 | 3×5 | 143.0790° | 0.01′ |
| Eastern Veil, 2026-08-08 22:22 (wedge) | 4×5 | 123.0959° | 0.00′ |

The solved centres sit 0.5–2.5′ from the plan (mount pointing), identical for
plan and simulator.

## 2. Camera angle: Origin's solved tile Orientation vs simulator (b55)

Origin Orientation is clockwise from north. Simulator value = −(parallactic
angle + 55.0°) in alt-az, −55.0° on the wedge.

### Andromeda set 1 (alt-az, lat 49.90)

| Tile | Time | Origin | Sim b55 | Δ | Sim b54 preset logic |
|---|---|---|---|---|---|
| 1 | 21:03:00 | 356.20 | 356.08 | −0.12 | skew wrong by 47° |
| 2 | 21:14:51 | 357.17 | 357.04 | −0.13 | |
| 3 | 21:26:41 | 358.18 | 357.96 | −0.22 | |
| 4 | 21:38:28 | 358.98 | 358.82 | −0.16 | |
| 5 | 21:50:20 | 359.92 | 359.64 | −0.28 | |
| 6 | 22:02:25 | 0.90 | 0.41 | −0.49 | |

### Pleiades (alt-az, lat 49.90)

| Tile | Time | Origin | Sim b55 | Δ |
|---|---|---|---|---|
| 1 | 00:04:31 | 348.89 | 348.90 | +0.01 |
| 2 | 00:10:27 | 348.88 | 349.08 | +0.20 |
| 3 | 00:16:13 | 348.91 | 349.24 | +0.33 |
| 4 | 00:21:59 | 349.37 | 349.39 | +0.02 |
| 5 | 00:27:44 | 349.38 | 349.52 | +0.14 |
| 6 | 00:33:31 | 349.38 | 349.63 | +0.25 |
| 7 | 00:39:17 | 349.78 | 349.72 | −0.06 |
| 8 | 00:45:03 | 349.75 | 349.79 | +0.04 |
| 9 | 00:50:50 | 349.73 | 349.85 | +0.12 |

Origin aligned the box to the camera (box 168.93°, tile 1 chip 348.89°, skew
0.04°). The simulator's default box now gives skew 0.03°.

### Andromeda set 2, 22:35 run (alt-az, lat 49.90)

| Tile | Time | Origin | Sim b55 | Δ |
|---|---|---|---|---|
| 1 | 22:35:24 | 1.20 | 2.23 | +1.03 |
| 2 | 22:46:35 | 1.99 | 2.73 | +0.74 |
| 3 | 22:57:45 | 2.81 | 3.16 | +0.35 |
| 4 | 23:08:53 | 2.27 | 3.51 | +1.24 |
| 5 | 23:20:05 | 2.95 | 3.77 | +0.82 |
| 6 | 23:31:15 | 3.64 | 3.93 | +0.29 |

### Andromeda 3×5, 2026-08-20 (alt-az, lat 49.90, preset)

| Tile | Time | Origin | Sim b55 | Δ |
|---|---|---|---|---|
| 1 | 23:18:20 | 1.84 | 0.52 | −1.32 |
| 2 | 23:30:04 | 2.15 | 1.22 | −0.93 |
| 3 | 23:41:52 | 2.36 | 1.87 | −0.49 |
| 4 | 23:53:42 | 4.24 | 2.44 | −1.80 |

### Eastern Veil, 2026-08-08 (wedge, lat 49.09, preset)

| Tile (log order) | Time | Origin | Sim b55 | Δ |
|---|---|---|---|---|
| 1 | 22:23:30 | 303.18 | 305.00 | +1.82 |
| 2 | 22:35:39 | 303.15 | 305.00 | +1.85 |
| 3 | 22:47:50 | 303.19 | 305.00 | +1.81 |
| 4 | 23:00:02 | 303.21 | 305.00 | +1.79 |
| 5 | 23:12:10 | 303.26 | 305.00 | +1.74 |
| 6 | 23:24:19 | 303.30 | 305.00 | +1.70 |
| 7 | 23:36:28 | 303.34 | 305.00 | +1.66 |
| 8 | 23:48:34 | 303.43 | 305.00 | +1.57 |

The parallactic angle moved from −44.5° to −27.5° during this run while the
chip stayed within 0.25°: the mount was on the wedge. The 1.7° offset is the
polar-alignment error of that night.

## 3. Camera roll constant

Origin Orientation + parallactic angle, alt-az tiles only:

| Night | Tiles | Mean |
|---|---|---|
| 2026-08-20 | 4 | 306.6° |
| 2026-09-08 set 1 | 6 | 305.2° |
| 2026-09-08 set 2 | 8 | 304.2° |
| 2026-09-09 Pleiades | 9 | 304.9° |
| Weighted | 27 | 305.0° → `ORIGIN_CAM_ROLL = 55.0°` |

The scatter between nights (±1.5°) is the tripod levelling; within a night the
constant drifts by less than 1.4°.

## 4. What changed from b54

- b54 assumed the chip up axis is the zenith direction. The real chip is rolled 55°.
- b54's real-run presets set the camera angle equal to the box orientation with
  mixed sign conventions, drawing the chips 22°–47° off their true skew. b55
  derives the camera angle from the model (kinematics + camera roll).
- The skew readout used the wrong sign; alignment is roll + orientation ≡ 0 (mod 180).
- The Veil preset used fitted numbers (123.86°, RA 312.7982, Dec 31.0944); it
  now uses the logged plan and loads in equatorial mode.
- The camera-angle slider and readout are in Origin's convention (clockwise
  from north), so they can be compared with the app directly.
