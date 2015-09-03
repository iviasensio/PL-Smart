P&L Smart, a Qlik Sense Extension for Financial reporting 
=============================
=============================

Current version 1.1:

This extension is useful to create reports where the look&feel is rellevant.

Is specifically focus on financial reports, trying to solve some common needs of this area.

You'll find very useful info about the guidelines inside the app P&LExample.qvf


Author:Ivan Felipe Asensio

ivan.felipe@qlik.com

QlikTech Iberia,s.l.


Bugs fixed and improvements:
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
