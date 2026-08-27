# Branding update: Beyond to étalon

_Started 2026-08-27 06:15 UTC_

---

## User

Change 'Beyond' in the whole project to _ètalon with the etalon logo (we have in somewhere on the project)

## Assistant

I'll look for the logo and find all "Beyond" references.

_[tool: grep]_

_[tool: list_files]_

_[tool: list_files]_

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: view_image]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: view_image]_

_[tool: grep]_

_[tool: grep]_

_[tool: list_files]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: copy_files]_

_[tool: run_script]_

_[tool: run_script]_

Now removing the old files and folder.

_[tool: delete_file]_

_[tool: grep]_

_[tool: read_file]_

_[tool: run_script]_

_[tool: ready_for_verification]_

Renamed across the whole project — `_beyond` → `_étalon` (acute accent, per the wordmark rules already written in the guidelines; unaccented `_etalon` is a misspelling in French).

What changed:
- All screens, slides, emails, guidelines, components and docs now read `_étalon`, including internal code identifiers.
- `beyond-ds/` → `etalon-ds/`, `beyond-mark.svg` → `etalon-mark.svg`, `BEYOND-GUIDELINES.md` → `ETALON-GUIDELINES.md`, and the six `source/Beyond …dc.html` files → `_etalon …dc.html` (filenames use ASCII since the system strips accents from paths).
- Prose uses of the ordinary word "beyond" ("beyond the coastal belt") left alone.

Two judgement calls: the closing slide's "registered trademark of Opeaz LTD" now says "a product of Opeaz LTD" (nothing is filed for _étalon), and its footer domain became etalon.opeaz.com.

On the logo: I found no separate étalon mark file, so every lockup kept the existing lime rounded square with the ink eclipse. If you have a new étalon mark somewhere, point me at it and I'll swap it in.

## User

https://claude.ai/code/artifact/78fd92fb-abbe-4e59-84ed-c0a4f3cbd0ff?via=auto_preview

In terms of icon, you should take the canonical version from this artifact.

## Assistant

_[tool: web_fetch]_

I can't read that artifact — the page is rendered behind auth, so the fetch returns an empty shell.

Can you paste the icon's SVG markup into chat (or drop the file into the project)? Then I'll make it the canonical `etalon-ds/assets/etalon-mark.svg` and swap every inline lockup across the screens, guidelines, slides and emails to match it.

## User

<attached_files>
- uploads/etalon-mark-canonical-lime.svg
</attached_files>

## Assistant

_[tool: read_file]_

_[tool: grep]_

_[tool: read_file]_

_[tool: grep]_

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: run_script]_

_[tool: run_script]_

Now the design-system assets, Logo component and guideline copy.

_[tool: run_script]_

_[tool: grep]_

_[tool: ready_for_verification]_

The canonical mark is in — lime rounded square (radius 29.5%) with one ink underscore bar at 54.5% × 13.6%, sitting on the lower third.

Applied to: all four lockups in v3-Final (and the same in v3, v2), both mark SVGs in the design system, the `Logo` component (its `eclipse` prop is now `bar`), the mark and drawing guideline cards, and the brand guidelines text. Slides, emails and the DS index pick it up automatically since they load the SVG.

Left untouched: `_etalon Mark Options.dc.html`, which is the historical record of the six options.

## User

On the ask page - can you put the logo next to the etalon and not above it? like it's in the sidebar

## Assistant

_[tool: grep]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Mark and wordmark now sit side by side on the ask page, 16px gap, same lockup order as the sidebar.

## User

Remove the _before the etalon text where we have the logo next to it

## Assistant

_[tool: read_file]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: read_file]_

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Dropped the underscore from the three lockups where the mark sits next to the word: intro header, sidebar, and the ask page. Inline mentions in running copy still read `_étalon`, since there's no mark beside them to carry the underscore — say the word and I'll change those too.

## User

Lets revert back to Beyond and not Etalon - including the previous logo we had

## Assistant

_[tool: grep]_

_[tool: list_files]_

_[tool: read_file]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: run_script]_

_[tool: delete_file]_

_[tool: grep]_

_[tool: ready_for_verification]_

Reverted to `_beyond` throughout: all six screens, `beyond-ds/` (142 files), guidelines, slides, emails, and code identifiers. The old lime-square-with-eclipsing-ink-circle mark is back in both SVG assets, the `Logo` component (`bar` prop is `eclipse` again), and all inline lockups. The étalon rename note and accent rule are gone from the guidelines, and the closing slide reads "registered trademark of Opeaz LTD" again.

One thing I kept, since you asked for it separately and it wasn't about the name: on the ask page the mark still sits beside the wordmark rather than above it. Say the word and I'll stack it again.

## User

Lets improve the design of the items in the connect library. Attached is an example of how I want each item to look: smaller cards, shorter desc, no 'scheduled, etc.' small text, a + btn and not a 'connect' btn 
Also - use the 'Popular' for some selected items (you choose) AND change the 'verified' icon we currently have to the one in the image

## Assistant

_[tool: view_image]_

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: show_html]_

_[tool: ready_for_verification]_

Library cards rebuilt as horizontal rows: 34px logo, name line with the new scalloped verified seal and a teal "Popular ↗" tag, one short description line, and a 28px `+` button on the right that turns lime with a check when added. Mode text ("SCHEDULED", "ON YOUR BEHALF") and the category subline are gone; grid is now 292px columns.

Popular is on eight: File upload, Your mailbox, Google Drive, Google Sheets, L'Oréal portal, Ubipharm, WHO health stats, Pharmacy register. Easy to change which.

Descriptions were shortened to one line each — tell me if any lost something you needed.

## User

The + btn should not have outline stroke and you can make the + a bit larger

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

Border removed, glyph up to 22px on a 30px hit area; hover now shows a soft fill instead of a stroke. Added state still fills lime with the check.

## User

Make the + btn lines longer, thinner and in a bit lighter grey

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

The plus is now a drawn 26px cross with 1.3px strokes in light grey (#A8A8A0) — longer arms, thinner, lighter. Added state still shows the lime check.

## User

It too big now - shorter a. bit

## Assistant

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Down to 20px, stroke nudged to 1.6px so it stays visible at the smaller size.

## User

Make it 18px with 1.8px

## Assistant

_[tool: dc_html_str_replace]_

_[tool: ready_for_verification]_

Done — 18px at 1.8px stroke.

