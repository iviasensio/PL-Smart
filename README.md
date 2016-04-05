P&L Smart, a Qlik Sense Extension for Financial reporting 
=============================
=============================
Available in https://github.com/iviasensio/PL-Smart

Current version 2.0:

This extension is useful to create reports where the look&feel is rellevant.

Is specifically focus on financial reports, trying to solve some common needs of this area.

You'll find very useful info about the guidelines inside the app P&LExample.qvf

WARNING1: before import the extension from the server remember to remove all the non functional files.
Please remove:
.gitattributes
.gitignore
P&L.xlsx
P&LExample.qvf
P&LSmart.png
Qlik Sense P&LSmart Extension Manual.pdf
README.md

WARNING2: now you'll be able to hide the Export to excel button.
You'll need to edit your P&LSmart reports and clic on the option 'Allow export to excel'.
Although it's check in 'Allow' by default for the new reports, it's needed to do that for the oldest ones.


Author:Ivan Felipe Asensio

ivan.felipe@qlik.com

QlikTech Iberia,s.l.


Bugs fixed and improvements in v1.1:
- Mode Parent-Child:
	.the background color for comments gets the incorrect format
	.if you choose the option 'Recal measure for all groups' (by default)
	 the amounts are initialized to 0 for the parent groups
- Mode Custom:
	.now you can apply any color for the background tag,
	 not only <violete>,<clear>,<dark>,<red>,<soft> and <orange>,
	 for that it's need to inform about the hexadecimal color, like #ffeeb7 in the xls cell,
	 there is an example in the attached xlsx file

- all modes:
  	.the color of the orange style is now better fixed

Bugs fixed an dimprovements in v2.0 (23-oct-2015):
Bugs fixed:
- export to excel: current selections now it merge correctly when you export
- export to excel: parent child, suppress extra blank rows when export
- parent-child mode: no need to initialize to 0 all values when you do not want the extension to calculate for you all the subgroups

Improvements:
- export to excel: option true/false, you can chose to include or not the xls button
