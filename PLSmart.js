define(["jquery", "text!./PLSmart.css"], function($, cssContent) {'use strict';
	$("<style>").html(cssContent).appendTo("head");
	return {
		initialProperties : {
			version: 1.0,
			qHyperCubeDef : {
				qDimensions : [],
				qMeasures : [],
				qInitialDataFetch : [{
					qWidth : 10,
					qHeight : 100
				}]
			}
		},
		definition : {
			type : "items",
			component : "accordion",
			items : {
				dimensions : {
					uses : "dimensions",
					min : 1
				},
				measures : {
					uses : "measures",
					min : 0
				},
				sorting : {
					uses : "sorting"
				},
				settings : {
					uses : "settings",
					items: {
						Header: {
							type: "items",
							label: "Header Format",
							items: {
								Align:{
									ref: "HeaderAlign",
									translation: "Header Alignment",
									type: "number",
									component: "buttongroup",
									options: [ {
										value: 1,
										label: "Left"
									}, {
										value: 2,
										label: "Center"
									}, { 
										value: 3,
										label: "Right"
									}],
									defaultValue: 1,
									
								},
								headercolors: {
								  ref: "HeaderColorSchema",
								  type: "string",
								  component: "dropdown",
								  label: "BackGround Header Color",
								  options: 
									[ {
										value: "#ffffff",
										label: "Clean"
									}, {
										value: "#efefef",
										label: "Soft"
									}, {
										value: "#cccccc",
										label: "Dark"
									}, {
										value: "#4575b4",
										label: "Blue"
									}, {
										value: "#ffe697",
										label: "Orange"
									}, {
										value: "#da9694",
										label: "Red"
									}
									
									
									],
								  defaultValue: "#ffffff",
								  								
							        },
							}
						},
						Formatted: {
							type: "items",
							label: "Table Format",
							items: {
								initFetchRows : {
									ref : "qHyperCubeDef.qInitialDataFetch.0.qHeight",
									label : "Initial fetch rows",
									type : "number",
									defaultValue : 100
								},
								Style:{
									ref: "TableStyle",
									translation: "Style",
									type: "string",
									component: "radiobuttons",
									options: [ {
										value: "basic",
										label: "Basic"
									}, {
										value: "custom",
										label: "Custom"
									}, {
										value: "parentchild",
										label: "Parent-Child"
									}
									],
									defaultValue: "basic"
								},
								IndentMode : {
									ref : "indentmode",
									type : "boolean",
									label : "Indent Mode",
									defaultValue : true
								},
								colors: {
								  ref: "ColorSchema",
								  type: "string",
								  component: "dropdown",
								  label: "BackGround Color",
								  options: 
									[ {
										value: "#ffffff",
										label: "Clean"
									}, {
										value: "#efefef",
										label: "Soft"
									}, {
										value: "#cccccc",
										label: "Dark"
									}, {
										value: "#4575b4",
										label: "Blue"
									}, {
										value: "#fff8e1",
										label: "Orange"
									}, {
										value: "#da9694",
										label: "Red"
									}
									
									
									],
								  defaultValue: "#ffffff",
								  show : function(data) {
										return data.TableStyle != "custom";
									}																			
							        },
								NumDecimals:{
									ref: "NumDecimals",
									translation: "Number of decimals to show",
									type: "number",
									defaultValue: 0,
									show : function(data) {
										return data.TableStyle == "parentchild";
									}
								},
								DecimalSep:{
									ref: "DecimalSep",
									translation: "Decimals separator",
									type: "string",
									defaultValue: ",",
									show : function(data) {
										return data.TableStyle == "parentchild";
									}
								},
								ThousandSep:{
									ref: "ThousandSep",
									translation: "Thousands separator",
									type: "string",
									defaultValue: ".",
									show : function(data) {
										return data.TableStyle == "parentchild";
									}
								},
								
								LogicTags:{
									ref: "LogicTags",
									translation: "Criteria for special Tags",
									type: "string",
									component: "radiobuttons",
									options: [ {
										value: "bycoincidence",
										label: "By Coincidence"
									}, {
										value: "bydimension",
										label: "By 2nd Dimension"
									} ],
									defaultValue: "bycoincidence",
									show : function(data) {
										return data.TableStyle == "basic";
									}
								},
								LogicTagsUpperCase : {
									ref : "LogicTagsUpperCase",
									type : "boolean",
									label : "Use Uppercase",
									defaultValue : true,
									show : function(data) {
										return data.LogicTags == 'bycoincidence' && data.TableStyle == "basic";
									}
								},
								LogicTagsStartsWith:{
									ref: "LogicTagsStartsWith",
									translation: "Starts with...",
									type: "string",
									defaultValue: "none",
									show : function(data) {
										return data.LogicTags == 'bycoincidence' && data.TableStyle == "basic";
									}	
								},
								LogicTagsEndsWith:{
									ref: "LogicTagsEndsWith",
									translation: "Ends with...",
									type: "string",
									defaultValue: "none",
									show : function(data) {
										return data.LogicTags == 'bycoincidence' && data.TableStyle == "basic";
									}	
								},
								LogicTagsContains:{
									ref: "LogicTagsContains",
									translation: "Contains ...",
									type: "string",
									defaultValue: "none",
									show : function(data) {
										return data.LogicTags == 'bycoincidence' && data.TableStyle == "basic";
									}	
								},
								FixedNumberofLevels:{
									ref: "FixedNumberofLevels",
									expression:"optional",
									translation: "Num of Levels (2 to 10)",
									type: "integer",
									defaultValue: 10,
									component: "slider",
									min: 2,
									max: 10,
									step: 1,
									show : function(data) {
										return (data.LogicTags == 'bydimension' && data.TableStyle == "basic") ||  data.TableStyle == "parentchild";
									}
								},
								RecalcGroups : {
									ref : "recalcgroups",
									type : "boolean",
									label : "Recalc measures for all groups",
									defaultValue : true,
									show : function(data) {
										return data.TableStyle == "parentchild";
									}
								},
								Comments:{
									ref: "tagcomments",
									translation: "This tag in parent dimension identifies comments",
									type: "string",
									defaultValue: "*",
									show : function(data) {
										return data.TableStyle == "parentchild";
									}
								}
							}
						}						
					}	
				}
			}
		},
		snapshot : {
			canTakeSnapshot : true
		},
		paint : function($element,layout) {
			var myFootNote = layout.footnote;
			var vComments = layout.tagcomments;
			
			var MaxSize = Math.min($element.width(), $element.height());
			var Diameter = MaxSize * 0.65;
			var Offset = MaxSize * 0.35;
			var yWorking = MaxSize * 0.3;
			var FontSizeWorking = Math.floor(MaxSize * 0.05);
			
			var dim_count = layout.qHyperCube.qDimensionInfo.length;
			var measure_count = layout.qHyperCube.qMeasureInfo.length;
			
			var vStyle = layout.TableStyle;
			var vIndentMode = layout.indentmode;
			var vLogicTags = layout.LogicTags;
			var vUpper = layout.LogicTagsUpperCase;
			var vStartsWith = 'none';
			if(layout.LogicTagsStartsWith != 'undefined'){
				vStartsWith = layout.LogicTagsStartsWith;
			}
			var vEndsWith = 'none';
			if(layout.LogicTagsEndsWith != 'undefined'){
				vEndsWith = layout.LogicTagsEndsWith;
			}
			var vContains = 'none';
			if(layout.LogicTagsContains != 'undefined'){
				vContains = layout.LogicTagsContains;
			}
			var vRecalcGroups = layout.recalcgroups;
			var vNumberOfLevels = layout.FixedNumberofLevels;
			var vHeaderAlign = layout.HeaderAlign;
			var vHeaderColorSchema = layout.HeaderColorSchema;
			var vColorSchema = layout.ColorSchema;
			
			var vColorText = "";
			
			if (vColorSchema == '#4575b4') {
				vColorText = 'white'
			}else{
				vColorText = '#545352';
			}
			
			var vHeaderColorText = "";
			if (vHeaderColorSchema == '#4575b4') {
				vHeaderColorText = 'white'
			}else{
				vHeaderColorText = '#545352';
			}
			
			var vHeaderAlignText = "";
			switch (vHeaderAlign)
			{
				case 1:
				vHeaderAlignText = 'left';
				break;
				case 2:
				vHeaderAlignText = 'center';
				break;
				case 3:
				vHeaderAlignText = 'right';
				break;
			}
			
			var ScreenWidth=window.screen.width;
			var ScreenHeight=window.screen.height;
			var movefromedge=0;
			var placementx=(ScreenWidth/2)-((400)/2);
			var placementy=(ScreenHeight/2)-((300+50)/2);
			
			var vMeasure1 = 0;
			var vMeasure2 = 0;
			var vMeasure3 = 0;
			var vMeasure4 = 0;
			
			var vMeasure2Tag = "";
			var vMeasure3Tag = "";
			var vMeasure4Tag = "";
			
			var vIndent = "";
			
			
			var vBoldFlag = "";
			var vDimName = "";
			
			var html = "<div id='PLSmart'><table charset=utf-8><thead><tr>", self = this, lastrow = 0, morebutton = false;
			var html2 = "";
			//render titles
			var vNumDims = 0;
			var vNumMeasures = 0;
			var vNumMeasuresCheckLevels = 2;
			
			$.each(this.backendApi.getDimensionInfos(), function(key, value) {
				vDimName = value.qFallbackTitle;
				vNumDims++;
			
				if (vNumDims == 1 || (vStyle == 'basic' && vLogicTags == 'bycoincidence')) {
					html += '<th style="color:' + vHeaderColorText +';background-color:' + vHeaderColorSchema + ';font-size:18px;height:45px;vertical-align:middle;text-align:' + vHeaderAlignText + '">' + value.qFallbackTitle + '</th>';
				}								
			});
			
			$.each(this.backendApi.getMeasureInfos(), function(key, value) {
				vDimName = value.qFallbackTitle;
				vNumMeasures++;
				vNumMeasuresCheckLevels++;
					html += '<th style="color:' + vHeaderColorText +';background-color:' + vHeaderColorSchema + ';font-size:18px;height:45px;vertical-align:middle;text-align:' + vHeaderAlignText + '">' + value.qFallbackTitle + '</th>';
				
				
			});
			
			if (measure_count == 2 && vStyle == 'parentchild') {
				html += '<th style="color:' + vHeaderColorText +';background-color:' + vHeaderColorSchema + ';font-size:18px;height:45px;vertical-align:middle;text-align:' + vHeaderAlignText + '">' + 'Abs. Var' + '</th>';
				html += '<th style="color:' + vHeaderColorText +';background-color:' + vHeaderColorSchema + ';font-size:18px;height:45px;vertical-align:middle;text-align:' + vHeaderAlignText + '">' + '% Var' + '</th>';
			}
			
			
			html += "</tr></thead><tbody>";
			
			var vColumnTextUpper = "";
			
			//render data
			var vRow = -1;
			var arrayL1Aux = new Array();
			
			var arrayL1 = new Array();
			var arrayL2 = new Array();
			var arrayL3 = new Array();
			var arrayL4 = new Array();
			var arrayL5 = new Array();
			var arrayL6 = new Array();
			var arrayL7 = new Array();
			var arrayL8 = new Array();
			var arrayL9 = new Array();
			var arrayL10 = new Array();
			var arrayL11 = new Array();
			var arrayL12 = new Array();
			var arrayL13 = new Array();
			var arrayL14 = new Array();
			
			var vOKParentChild = 0;
			
			this.backendApi.eachDataRow(function(rownum, row) {
				lastrow = rownum;
				html += '<tr>';
				var vColumn = 0;
				var vColumnP = 0;
				
				var vColumnText = "";
				var vStartsRight = 0;
				
				var vBoldNumber = 0;
				var vTagText = "";
				var vComment = 0;
				var vComas = 0;
				var dim = row[0];
				
				
				if (vStyle=='parentchild') {
					if (dim_count == 3 && measure_count > 0 && measure_count < 3) {
						vOKParentChild = 1;
					if (measure_count == 2) {
						arrayL1[lastrow] = new Array(9);
						if (vRecalcGroups) {
							arrayL1[lastrow][6] = row[4].qNum;//measure2
						}else{
							arrayL1[lastrow][6] = 0;//measure2
						}
						
						arrayL1[lastrow][7] = row[3].qNum - row[4].qNum;//measure3 - absolute difference
						arrayL1[lastrow][8] = 0; //measure4 - % difference
					}else{
						arrayL1[lastrow] = new Array(6);
					}
					
					arrayL1[lastrow][0] = row[0].qText;//child
					arrayL1[lastrow][1] = row[1].qText;//parent
					arrayL1[lastrow][2] = row[2].qText;//desc
					arrayL1[lastrow][3] = row[0].qElemNumber;//internal code to make further selections
					arrayL1[lastrow][4] = 1;//1 is de default level for all concepts
					if (vRecalcGroups) {
						arrayL1[lastrow][5] = row[3].qNum;//measure1
					}else{
						arrayL1[lastrow][5] = 0;//measure1
					}
					
					
					
					arrayL1Aux[lastrow] = row[0].qText;
					}else{
						vOKParentChild = 0;
					}
				}else{
				
				$.each(row, function(key, cell) {
					if(cell.qIsOtherCell) {
						cell.qText = self.backendApi.getDimensionInfos()[key].othersLabel;
					}
					vBoldFlag = cell.qText;
										
					vColumn++;
					
					
					if (vStyle=='basic') {
												
						vComas = 0;
						if (vLogicTags == 'bycoincidence') {
							html += '<td style ="';
							vColumnText = cell.qText;
							vStartsRight = vColumnText.length - vEndsWith.length - 1;
							if (vColumn==1) {
								
								html2 = "";
								vColumnTextUpper = vColumnText.toUpperCase();
							
								if (
								    (vColumnText==vColumnTextUpper && vUpper) 
								    || (vStartsWith !='none' && vStartsWith == vColumnText.substring(0, vStartsWith.length)) 
								    || (vEndsWith !='none' && vEndsWith == vColumnText.substring(vColumnText.length - vEndsWith.length)) 
								    || (vContains !='none' && vColumnText.indexOf(vContains)>=0)
								    )
								{
									vBoldNumber = 1;
									
								}else{
									vBoldNumber = 0;
								}
							}
							
							if ((vColumnText==vColumnTextUpper && vUpper) || (vStartsWith !='none' && vStartsWith == vColumnText.substring(0, vStartsWith.length)) || (vEndsWith !='none' && vEndsWith == vColumnText.substring(vColumnText.length - vEndsWith.length))|| (vContains !='none' && vColumnText.indexOf(vContains)>=0) || vBoldNumber == 1)
							{
								html += "font-weight:bold;background-color:" + vColorSchema + ";color:" + vColorText;
							}else{
								if (vIndentMode) {
									html += 'padding-left:15px';
								}
							}
						
							if (vColumn <= vNumDims) {
								html += '">' + vColumnText + '</td>';						
							}else{
								html += html2 +';text-align:right">' + vColumnText + '</td>';													
							}
						}else{
							if (vColumn == 1 || vColumn > vNumDims) {
								html += '<td style ="';
								vColumnText = cell.qText;
								if (vColumn==1) {
									html2 = "";
									vComment = 0;
								}						
						
								vComas = 0;
								
							}else{
								if (vComas >0) {
									html += ';';
									html2 += ';';
								}
								
								switch (cell.qText) {
									case '0':
									html += levelPC0();
									html2 += levelPC0();
									if (vIndentMode){	
										html += ';padding-left:30px';
									}
									vComment = 1;									
									vComas ++;
									break;
								
									case '1':
									if (vIndentMode){	
										html += 'padding-left:45px';
									}
									vComas ++;
									break;
								
									case '2':
									html += levelPC2();
									html2 += levelPC2();
									if (vIndentMode){	
										html += ';padding-left:30px';
										html2 += ';padding-left:30px';
									}
									vComas ++;
									break;
								
									case '3':
									if(vNumberOfLevels <3){	
										html += levelPC2();
										html2 = levelPC2();
									}else{
										html += levelPC3();
										html2 = levelPC3();
									}
									
									if (vIndentMode){	
										html += ';padding-left:15px';
										html2 += ';padding-left:15px';
									}
									vComas ++;
									break;
								
									case '4':
									if(vNumberOfLevels <4){	
										if(vNumberOfLevels <3){	
											html += levelPC2();
											html2 = levelPC2();
										}else{
											html += levelPC3();
											html2 = levelPC3();
										}
									}else{
										html += levelPC4();
										html2 = levelPC4();
									}
									vComas ++;
									break;
								
									case '5':
									if(vNumberOfLevels <5){
										if(vNumberOfLevels <4){	
											if(vNumberOfLevels <3){	
												html += levelPC2();
												html2 = levelPC2();
											}else{
												html += levelPC3();
												html2 = levelPC3();
											}
										}else{
											html += levelPC4();
											html2 = levelPC4();
										}
									}else{
										html += levelPC5();
										html2 = levelPC5();
									}
									vComas ++;
									break;
								
									case '6':
									if(vNumberOfLevels <6){
										if(vNumberOfLevels <5){
											if(vNumberOfLevels <4){	
												if(vNumberOfLevels <3){	
													html += levelPC2();
													html2 = levelPC2();
												}else{
													html += levelPC3();
													html2 = levelPC3();
												}
											}else{
												html += levelPC4();
												html2 = levelPC4();
											}
										}else{		
											html += levelPC5();
											html2 = levelPC5();
										}
									}else{
										html += levelPC6();
										html2 = levelPC6();
									}
									vComas ++;
									break;
								
									case '7':
									if(vNumberOfLevels <7){
										if(vNumberOfLevels <6){
											if(vNumberOfLevels <5){
												if(vNumberOfLevels <4){	
													if(vNumberOfLevels <3){	
														html += levelPC2();
														html2 = levelPC2();
													}else{
														html += levelPC3();
														html2 = levelPC3();
													}
												}else{
													html += levelPC4();
													html2 = levelPC4();
												}
											}else{
												html += levelPC5();
												html2 = levelPC5();
											}
										}else{
											html += levelPC6();
											html2 = levelPC6();
										}
									}else{
										html += levelPC7();
										html2 = levelPC7();
									}
									vComas ++;
									break;
					
									case '8':
									if(vNumberOfLevels <8){
										if(vNumberOfLevels <7){
											if(vNumberOfLevels <6){
												if(vNumberOfLevels <5){
													if(vNumberOfLevels <4){	
														if(vNumberOfLevels <3){	
															html += levelPC2();
															html2 = levelPC2();
														}else{
															html += levelPC3();
															html2 = levelPC3();
														}
													}else{
														html += levelPC4();
														html2 = levelPC4();
													}
												}else{
													html += levelPC5();
													html2 = levelPC5();
												}
											}else{
												html += levelPC6();
												html2 = levelPC6();
											}
										}else{
										html += levelPC7();
										html2 = levelPC7();
										}
									}else{
										html += levelPC8();
										html2 = levelPC8();
									}
									vComas ++;
									break;
								
									case '9':
									if(vNumberOfLevels <9){
										if(vNumberOfLevels <8){
											if(vNumberOfLevels <7){
												if(vNumberOfLevels <6){
													if(vNumberOfLevels <5){
														if(vNumberOfLevels <4){	
															if(vNumberOfLevels <3){	
																html += levelPC2();
																html2 = levelPC2();
															}else{
																html += levelPC3();
																html2 = levelPC3();
															}
														}else{
															html += levelPC4();
															html2 = levelPC4();
														}
													}else{
														html += levelPC5();
														html2 = levelPC5();
													}
												}else{
													html += levelPC6();
													html2 = levelPC6();
												}
											}else{
											html += levelPC7();
											html2 = levelPC7();
											}
										}else{
											html += levelPC8();
											html2 = levelPC8();
										}
									}else{
										html += levelPC9();
										html2 = levelPC9();
									}
									vComas ++;
									break;
								
												
											
									default:
									if(vNumberOfLevels <10){
										if(vNumberOfLevels <9){
											if(vNumberOfLevels <8){
												if(vNumberOfLevels <7){
													if(vNumberOfLevels <6){
														if(vNumberOfLevels <5){
															if(vNumberOfLevels <4){	
																if(vNumberOfLevels <3){	
																	html += levelPC2();
																	html2 = levelPC2();
																}else{
																	html += levelPC3();
																	html2 = levelPC3();
																}
															}else{
																html += levelPC4();
																html2 = levelPC4();
															}
														}else{
															html += levelPC5();
															html2 = levelPC5();
														}
													}else{
														html += levelPC6();
														html2 = levelPC6();
													}
												}else{					
													html += levelPC7();
													html2 = levelPC7();
												}
											}else{
												html += levelPC8();
												html2 = levelPC8();
											}
										}else{
											html += levelPC9();
											html2 = levelPC9();
										}
									}else{
										html += levelPC10();
										html2 = levelPC10();
									}
									vComas ++;	
								}
							}
							
							if (vColumn == vNumDims) {
						
							html += '">' + vColumnText + '</td>';
						
							}else{
								if (vColumn > vNumDims) {
									if (vComment == 1){
										vColumnText = "";
									}
									html += html2 +';text-align:right">' + vColumnText + '</td>';							
								}							
							}
						}
					}else{
						if (vColumn == 1 || vColumn > vNumDims) {
							html += '<td style ="';
							vColumnText = cell.qText;
							if (vColumn==1) {
								html2 = "";							
							}						
						
							vComas = 0;						
							
						}else{	
										   
						if (vComas >0 && (cell.qText == '<white>' || cell.qText == '<bold>' || cell.qText == '<dark>' || cell.qText == '<soft>' || cell.qText == '<red>' || cell.qText == '<orange>' || cell.qText == '<violete>' || cell.qText == '<large>' || cell.qText == '<center>' || cell.qText == '<comment>' || cell.qText.substring(0, 1) == '#')) {
							html += ';';
							html2 += ';';
						}
						
						
						switch (cell.qText)
						{
							case '<white>':
							html += 'color:white';
							html2 += 'color:white';
							vComas ++;
							break;
						
							case '<bold>':
							html += 'font-weight:bold';
							html2 += 'font-weight:bold';
							vComas ++;
							break;
						
							case '<comment>': //here
							vComment = 1;
							vComas ++;
							break;												
						
							case '<dark>':
							html += 'background-color:#c4c4c4';
							html2 += 'background-color:#c4c4c4';
							vComas ++;
							break;
						
							case '<soft>':
							html += 'background-color:#d9d9d9';
							html2 += 'background-color:#d9d9d9';
							vComas ++;
							break;
						
							case '<red>':
							html += 'background-color:#da9694';
							html2 += 'background-color:#da9694';
							vComas ++;
							break;
						
							case '<orange>':
							html += 'background-color:#fabf8f';
							html2 += 'background-color:#fabf8f';
							vComas ++;
							break;
						
							case '<violete>':
							html += 'background-color:#ccc0da';
							html2 += 'background-color:#ccc0da';
							vComas ++;
							break;
						
							case '<large>':
							html += 'font-size:18px';
							html2 += 'font-size:18px';
							vComas ++;
							break;
						
							case '<center>':
							html += 'text-align:center';
							html2 += 'text-align:center';
							vComas ++;
							break;
						
							default:
							if (cell.qText.substring(0, 1) == '#') {
								html += 'background-color:' + cell.qText;
								html2 += 'background-color:' + cell.qText;
								vComas ++;								
							}
							break;							
						}
						
						}
						if (vColumn==1) {
							vComment = 0;
						}
						if (vColumn == vNumDims) {
							if (vIndentMode && vComas == 0) {
								html += 'padding-left:15px">' + vColumnText + '</td>'; 
							}else{
								html += '">' + vColumnText + '</td>';
							}
						}else{
						if (vColumn > vNumDims) {
							if (vComment == 1) {
								vColumnText = "";
							}
							html += html2 +';text-align:right">' + vColumnText + '</td>';							
						}												
						}	
					}
					
				});
				}
				html += '</tr>';				
			});
			
			//ini parent-child style
			
			if (vStyle=='parentchild' && vOKParentChild == 1){
				var arrayL2Aux = new Array();
				for (var i=0;i<arrayL1.length;i++){
					arrayL2Aux.push(arrayL1[i][1]);
				}
			
			var arrayL2Aux2 = arrayL2Aux.filter(onlyUnique).sort();			
			for (var ii=0;ii<arrayL2Aux2.length;ii++){
				var posParentL2 = arrayL1Aux.indexOf(arrayL2Aux2[ii]);
				arrayL2[ii] = new Array(3);
				arrayL2[ii][0] = arrayL2Aux2[ii];
				if (posParentL2 == -1) { //esto previene un error en caso de que informen de un padre que no esté a su vez en la columna 1 de lista de conceptos
					arrayL2[ii][1] = arrayL2Aux2[ii];
					
				}else{
					arrayL2[ii][1] = arrayL1[posParentL2][1];
					arrayL1[posParentL2][4] = 2;
				
				}
				
				arrayL2[ii][2] = 2;
				
			}
			
			
			if(arrayL2.length>1)
			{
				var arrayL3Aux = new Array();
				for (var iii=0;iii<arrayL2.length;iii++){
					arrayL3Aux.push(arrayL2[iii][1]);
				}
				var arrayL3Aux2 = arrayL3Aux.filter(onlyUnique).sort();
				
				for (var iv=0;iv<arrayL3Aux2.length;iv++){
					var posParentL3 = arrayL1Aux.indexOf(arrayL3Aux2[iv]);
					arrayL3[iv] = new Array(3);
					arrayL3[iv][0] = arrayL3Aux2[iv];
					if (posParentL3 == -1) {
						arrayL3[iv][1] = arrayL3Aux2[iv];
					}else{
						arrayL3[iv][1] = arrayL1[posParentL3][1];
						arrayL1[posParentL3][4] = 3;
					}
				
					arrayL3[iv][2] = 3;
					
				}
				
			};
			
			if(arrayL3.length>1)
			{
				var arrayL4Aux = new Array();
				for (var v=0;v<arrayL3.length;v++){
					arrayL4Aux.push(arrayL3[v][1]);
				}
				var arrayL4Aux2 = arrayL4Aux.filter(onlyUnique).sort();
				
				for (var vi=0;vi<arrayL4Aux2.length;vi++){
					var posParentL4 = arrayL1Aux.indexOf(arrayL4Aux2[vi]);
					arrayL4[vi] = new Array(3);
					arrayL4[vi][0] = arrayL4Aux2[vi];
					if (posParentL4 == -1) {
						arrayL4[vi][1] = arrayL4Aux2[vi];
					}else{
						arrayL4[vi][1] = arrayL1[posParentL4][1];
						arrayL1[posParentL4][4] = 4;
					}
				
					arrayL4[vi][2] = 4;
					
				}
				
			};
			
			if(arrayL4.length>1)
			{
				var arrayL5Aux = new Array();
				for (var vii=0;vii<arrayL4.length;vii++){
					arrayL5Aux.push(arrayL4[vii][1]);
				}
				var arrayL5Aux2 = arrayL5Aux.filter(onlyUnique).sort();
				
				for (var viii=0;viii<arrayL5Aux2.length;viii++){
					var posParentL5 = arrayL1Aux.indexOf(arrayL5Aux2[viii]);
					arrayL5[viii] = new Array(3);
					arrayL5[viii][0] = arrayL5Aux2[viii];
					if (posParentL5 == -1) {
						arrayL5[viii][1] = arrayL5Aux2[viii];
					}else{
						arrayL5[viii][1] = arrayL1[posParentL5][1];
						arrayL1[posParentL5][4] = 5;
					}
				
					arrayL5[viii][2] = 5;
					
				}
				
			};
			
			
			if(arrayL5.length>1)
			{
				var arrayL6Aux = new Array();
				for (var ix=0;ix<arrayL5.length;ix++){
					arrayL6Aux.push(arrayL5[ix][1]);
				}
				var arrayL6Aux2 = arrayL6Aux.filter(onlyUnique).sort();
				
				for (var x=0;x<arrayL6Aux2.length;x++){
					var posParentL6 = arrayL1Aux.indexOf(arrayL6Aux2[x]);
					arrayL6[x] = new Array(3);
					arrayL6[x][0] = arrayL6Aux2[x];
					if (posParentL6 == -1) {
						arrayL6[x][1] = arrayL6Aux2[x];
					}else{
						arrayL6[x][1] = arrayL1[posParentL6][1];
						arrayL1[posParentL6][4] = 6;
					}
				
					arrayL6[x][2] = 6;
					
				}
				
			};
			
			if(arrayL6.length>1)
			{
				var arrayL7Aux = new Array();
				for (var xi=0;xi<arrayL6.length;xi++){
					arrayL7Aux.push(arrayL6[xi][1]);
				}
				var arrayL7Aux2 = arrayL7Aux.filter(onlyUnique).sort();
				
				for (var xii=0;xii<arrayL7Aux2.length;xii++){
					var posParentL7 = arrayL1Aux.indexOf(arrayL7Aux2[xii]);
					arrayL7[xii] = new Array(3);
					arrayL7[xii][0] = arrayL7Aux2[xii];
					if (posParentL7 == -1) {
						arrayL7[xii][1] = arrayL7Aux2[xii];
					}else{
						arrayL7[xii][1] = arrayL1[posParentL7][1];
						arrayL1[posParentL7][4] = 7;
					}
				
					arrayL7[xii][2] = 7;
					
				}
				
			};
			
			if(arrayL7.length>1)
			{
				var arrayL8Aux = new Array();
				for (var xiii=0;xiii<arrayL7.length;xiii++){
					arrayL8Aux.push(arrayL7[xiii][1]);
				}
				var arrayL8Aux2 = arrayL8Aux.filter(onlyUnique).sort();
				
				for (var xiv=0;xiv<arrayL8Aux2.length;xiv++){
					var posParentL8 = arrayL1Aux.indexOf(arrayL8Aux2[xiv]);
					arrayL8[xiv] = new Array(3);
					arrayL8[xiv][0] = arrayL8Aux2[xiv];
					if (posParentL8 == -1) {
						arrayL8[xiv][1] = arrayL8Aux2[xiv];
					}else{
						arrayL8[xiv][1] = arrayL1[posParentL8][1];
						arrayL1[posParentL8][4] = 8;
					}
				
					arrayL8[xiv][2] = 8;
					
				}
				
			};
			
			if(arrayL8.length>1)
			{
				var arrayL9Aux = new Array();
				for (var xv=0;xv<arrayL8.length;xv++){
					arrayL9Aux.push(arrayL8[xv][1]);
				}
				var arrayL9Aux2 = arrayL9Aux.filter(onlyUnique).sort();
				
				for (var xvi=0;xvi<arrayL9Aux2.length;xvi++){
					var posParentL9 = arrayL1Aux.indexOf(arrayL9Aux2[xvi]);
					arrayL9[xvi] = new Array(3);
					arrayL9[xvi][0] = arrayL9Aux2[xvi];
					if (posParentL9 == -1) {
						arrayL9[xvi][1] = arrayL9Aux2[xvi];
					}else{
						arrayL9[xvi][1] = arrayL1[posParentL9][1];
						arrayL1[posParentL9][4] = 9;
					}
				
					arrayL9[xvi][2] = 9;
					
				}
				
			};
			
			if(arrayL9.length>1)
			{
				var arrayL10Aux = new Array();
				for (var xvii=0;xvii<arrayL9.length;xvii++){
					arrayL10Aux.push(arrayL9[xvii][1]);
				}
				var arrayL10Aux2 = arrayL10Aux.filter(onlyUnique).sort();
				
				for (var xviii=0;xviii<arrayL10Aux2.length;xviii++){
					var posParentL10 = arrayL1Aux.indexOf(arrayL10Aux2[xviii]);
					arrayL10[xviii] = new Array(3);
					arrayL10[xviii][0] = arrayL10Aux2[xviii];
					if (posParentL10 == -1) {
						arrayL10[xviii][1] = arrayL10Aux2[xviii];
					}else{
						arrayL10[xviii][1] = arrayL1[posParentL10][1];
						arrayL1[posParentL10][4] = 10;
					}
				
					arrayL10[xviii][2] = 10;
				}
			};
			
			if(arrayL10.length>1)
			{
				var arrayL11Aux = new Array();
				for (var xix=0;xix<arrayL10.length;xix++){
					arrayL11Aux.push(arrayL10[xix][1]);
				}
				var arrayL11Aux2 = arrayL11Aux.filter(onlyUnique).sort();
				
				for (var xx=0;xx<arrayL11Aux2.length;xx++){
					var posParentL11 = arrayL1Aux.indexOf(arrayL11Aux2[xx]);
					arrayL11[xx] = new Array(3);
					arrayL11[xx][0] = arrayL11Aux2[xx];
					if (posParentL11 == -1) {
						arrayL11[xx][1] = arrayL11Aux2[xx];
					}else{
						arrayL11[xx][1] = arrayL1[posParentL11][1];
						arrayL1[posParentL11][4] = 11;
					}
				
					arrayL11[xx][2] = 11;
				}
			};
			
			if(arrayL11.length>1)
			{
				var arrayL12Aux = new Array();
				for (var xxi=0;xxi<arrayL11.length;xxi++){
					arrayL12Aux.push(arrayL11[xxi][1]);
				}
				var arrayL12Aux2 = arrayL12Aux.filter(onlyUnique).sort();
				
				for (var xxii=0;xxii<arrayL12Aux2.length;xxii++){
					var posParentL12 = arrayL1Aux.indexOf(arrayL12Aux2[xxii]);
					arrayL12[xxii] = new Array(3);
					arrayL12[xxii][0] = arrayL12Aux2[xxii];
					if (posParentL12 == -1) {
						arrayL12[xxii][1] = arrayL12Aux2[xxii];
					}else{
						arrayL12[xxii][1] = arrayL1[posParentL12][1];
						arrayL1[posParentL12][4] = 12;
					}
				
					arrayL12[xxii][2] = 12;
				}
			};
			
			if(arrayL12.length>1)
			{
				var arrayL13Aux = new Array();
				for (var xxiii=0;xxiii<arrayL12.length;xxiii++){
					arrayL13Aux.push(arrayL12[xxiii][1]);
				}
				var arrayL13Aux2 = arrayL13Aux.filter(onlyUnique).sort();
				
				for (var xxiv=0;xxiv<arrayL13Aux2.length;xxiv++){
					var posParentL13 = arrayL1Aux.indexOf(arrayL13Aux2[xxiv]);
					arrayL13[xxiv] = new Array(3);
					arrayL13[xxiv][0] = arrayL13Aux2[xxiv];
					if (posParentL13 == -1) {
						arrayL13[xxiv][1] = arrayL13Aux2[xxiv];
					}else{
						arrayL13[xxiv][1] = arrayL1[posParentL13][1];
						arrayL1[posParentL13][4] = 13;
					}
				
					arrayL13[xxiv][2] = 13;
				}
			};
			
			if(arrayL14.length>1)
			{
				var arrayL14Aux = new Array();
				for (var xxv=0;xxv<arrayL14.length;xxv++){
					arrayL14Aux.push(arrayL13[xxv][1]);
				}
				var arrayL14Aux2 = arrayL14Aux.filter(onlyUnique).sort();
				
				for (var xxvi=0;xxvi<arrayL14Aux2.length;xxvi++){
					var posParentL14 = arrayL1Aux.indexOf(arrayL14Aux2[xxvi]);
					arrayL14[xxvi] = new Array(3);
					arrayL14[xxvi][0] = arrayL14Aux2[xxvi];
					if (posParentL14 == -1) {
						arrayL14[xxvi][1] = arrayL14Aux2[xxvi];
					}else{
						arrayL14[xxvi][1] = arrayL1[posParentL14][1];
						arrayL1[posParentL14][4] = 14;
					}
				
					arrayL14[xxvi][2] = 14;
					
				}
			};
			//Add the amounts to the parents
			
			if (vRecalcGroups) {
				
			var vPos1 = 0;					
			for (var vSumSaldo1 = 0;vSumSaldo1<arrayL1.length;vSumSaldo1++){ 
				if (arrayL1[vSumSaldo1][4] == 1) {
					vPos1 = arrayL1Aux.indexOf(arrayL1[vSumSaldo1][1]);
					if (vPos1 != -1) {
						arrayL1[vPos1][5] += arrayL1[vSumSaldo1][5];
						if (measure_count == 2) {
							arrayL1[vPos1][6] += arrayL1[vSumSaldo1][6];
							arrayL1[vPos1][7] += arrayL1[vSumSaldo1][7];
							arrayL1[vPos1][8] += (arrayL1[vSumSaldo1][5]/arrayL1[vSumSaldo1][6])-1;
						}
					}
				}				
			}
			
			var vPos2 = 0;					
			for (var vSumSaldo2 = 0;vSumSaldo2<arrayL1.length;vSumSaldo2++){ 
				if (arrayL1[vSumSaldo2][4] == 2) {
					vPos2 = arrayL1Aux.indexOf(arrayL1[vSumSaldo2][1]);
					if (vPos2 != -1) {
						arrayL1[vPos2][5] += arrayL1[vSumSaldo2][5];
						if (measure_count == 2) {
							arrayL1[vPos2][6] += arrayL1[vSumSaldo2][6];
							arrayL1[vPos2][7] += arrayL1[vSumSaldo2][7];
							arrayL1[vPos2][8] += (arrayL1[vSumSaldo2][5]/arrayL1[vSumSaldo2][6])-1;
						}
					}
				}				
			}
			
			var vPos3 = 0;			
			for (var vSumSaldo3 = 0;vSumSaldo3<arrayL1.length;vSumSaldo3++){ 
				if (arrayL1[vSumSaldo3][4] == 3) {
					vPos3 = arrayL1Aux.indexOf(arrayL1[vSumSaldo3][1]);
					if (vPos3 != -1) {
						arrayL1[vPos3][5] += arrayL1[vSumSaldo3][5];
						if (measure_count == 2) {
							arrayL1[vPos3][6] += arrayL1[vSumSaldo3][6];
							arrayL1[vPos3][7] += arrayL1[vSumSaldo3][7];
							arrayL1[vPos3][8] += (arrayL1[vSumSaldo3][5]/arrayL1[vSumSaldo3][6])-1;
						}
					}
				}				
			}
			
			var vPos4 = 0;			
			for (var vSumSaldo4 = 0;vSumSaldo4<arrayL1.length;vSumSaldo4++){ 
				if (arrayL1[vSumSaldo4][4] == 4) {
					vPos4 = arrayL1Aux.indexOf(arrayL1[vSumSaldo4][1]);
					if (vPos4 != -1) {
						arrayL1[vPos4][5] += arrayL1[vSumSaldo4][5];
						if (measure_count == 2) {
							arrayL1[vPos4][6] += arrayL1[vSumSaldo4][6];
							arrayL1[vPos4][7] += arrayL1[vSumSaldo4][7];
							arrayL1[vPos4][8] += (arrayL1[vSumSaldo4][5]/arrayL1[vSumSaldo4][6])-1;
						}
					}
				}				
			}
			
			var vPos5 = 0;			
			for (var vSumSaldo5 = 0;vSumSaldo5<arrayL1.length;vSumSaldo5++){ 
				if (arrayL1[vSumSaldo5][4] == 5) {
					vPos5 = arrayL1Aux.indexOf(arrayL1[vSumSaldo5][1]);
					if (vPos5 != -1) {
						arrayL1[vPos5][5] += arrayL1[vSumSaldo5][5];
						if (measure_count == 2) {
							arrayL1[vPos5][6] += arrayL1[vSumSaldo5][6];
							arrayL1[vPos5][7] += arrayL1[vSumSaldo5][7];
							arrayL1[vPos5][8] += (arrayL1[vSumSaldo5][5]/arrayL1[vSumSaldo5][6])-1;
						}
					}
				}				
			}
			
			var vPos6 = 0;			
			for (var vSumSaldo6 = 0;vSumSaldo6<arrayL1.length;vSumSaldo6++){ 
				if (arrayL1[vSumSaldo6][4] == 6) {
					vPos6 = arrayL1Aux.indexOf(arrayL1[vSumSaldo6][1]);
					if (vPos6 != -1) {
						arrayL1[vPos6][5] += arrayL1[vSumSaldo6][5];
						if (measure_count == 2) {
							arrayL1[vPos6][6] += arrayL1[vSumSaldo6][6];
							arrayL1[vPos6][7] += arrayL1[vSumSaldo6][7];
							arrayL1[vPos6][8] += (arrayL1[vSumSaldo6][5]/arrayL1[vSumSaldo6][6])-1;
						}
					}
				}				
			}
			
			var vPos7 = 0;			
			for (var vSumSaldo7 = 0;vSumSaldo7<arrayL1.length;vSumSaldo7++){ 
				if (arrayL1[vSumSaldo7][4] == 7) {
					vPos7 = arrayL1Aux.indexOf(arrayL1[vSumSaldo7][1]);
					if (vPos7 != -1) {
						arrayL1[vPos7][5] += arrayL1[vSumSaldo7][5];
						if (measure_count == 2) {
							arrayL1[vPos7][6] += arrayL1[vSumSaldo7][6];
							arrayL1[vPos7][7] += arrayL1[vSumSaldo7][7];
							arrayL1[vPos7][8] += (arrayL1[vSumSaldo7][5]/arrayL1[vSumSaldo7][6])-1;
						}
					}
				}				
			}
			
			var vPos8 = 0;			
			for (var vSumSaldo8 = 0;vSumSaldo8<arrayL1.length;vSumSaldo8++){ 
				if (arrayL1[vSumSaldo8][4] == 8) {
					vPos8 = arrayL1Aux.indexOf(arrayL1[vSumSaldo8][1]);
					if (vPos8 != -1) {
						arrayL1[vPos8][5] += arrayL1[vSumSaldo8][5];
						if (measure_count == 2) {
							arrayL1[vPos8][6] += arrayL1[vSumSaldo8][6];
							arrayL1[vPos8][7] += arrayL1[vSumSaldo8][7];
							arrayL1[vPos8][8] += (arrayL1[vSumSaldo8][5]/arrayL1[vSumSaldo8][6])-1;
						}
					}
				}				
			}
			
			var vPos9 = 0;			
			for (var vSumSaldo9 = 0;vSumSaldo9<arrayL1.length;vSumSaldo9++){ 
				if (arrayL1[vSumSaldo9][4] == 9) {
					vPos9 = arrayL1Aux.indexOf(arrayL1[vSumSaldo9][1]);
					if (vPos9 != -1) {
						arrayL1[vPos9][5] += arrayL1[vSumSaldo9][5];
						if (measure_count == 2) {
							arrayL1[vPos9][6] += arrayL1[vSumSaldo9][6];
							arrayL1[vPos9][7] += arrayL1[vSumSaldo9][7];
							arrayL1[vPos9][8] += (arrayL1[vSumSaldo9][5]/arrayL1[vSumSaldo9][6])-1;
						}
					}
				}				
			}
			
			var vPos10 = 0;			
			for (var vSumSaldo10 = 0;vSumSaldo10<arrayL1.length;vSumSaldo10++){ 
				if (arrayL1[vSumSaldo10][4] == 10) {
					vPos10 = arrayL1Aux.indexOf(arrayL1[vSumSaldo10][1]);
					if (vPos10 != -1) {
						arrayL1[vPos10][5] += arrayL1[vSumSaldo10][5];
						if (measure_count == 2) {
							arrayL1[vPos10][6] += arrayL1[vSumSaldo10][6];
							arrayL1[vPos10][7] += arrayL1[vSumSaldo10][7];
							arrayL1[vPos10][8] += (arrayL1[vSumSaldo10][5]/arrayL1[vSumSaldo10][6])-1;
						}
					}
				}				
			}
			
			var vPos11 = 0;			
			for (var vSumSaldo11 = 0;vSumSaldo11<arrayL1.length;vSumSaldo11++){ 
				if (arrayL1[vSumSaldo11][4] == 11) {
					vPos11 = arrayL1Aux.indexOf(arrayL1[vSumSaldo11][1]);
					if (vPos11 != -1) {
						arrayL1[vPos11][5] += arrayL1[vSumSaldo11][5];
						if (measure_count == 2) {
							arrayL1[vPos11][6] += arrayL1[vSumSaldo11][6];
							arrayL1[vPos11][7] += arrayL1[vSumSaldo11][7];
							arrayL1[vPos11][8] += (arrayL1[vSumSaldo11][5]/arrayL1[vSumSaldo11][6])-1;
						}
					}
				}				
			}
			
			var vPos12 = 0;			
			for (var vSumSaldo12 = 0;vSumSaldo12<arrayL1.length;vSumSaldo12++){ 
				if (arrayL1[vSumSaldo12][4] == 12) {
					vPos12 = arrayL1Aux.indexOf(arrayL1[vSumSaldo12][1]);
					if (vPos12 != -1) {
						arrayL1[vPos12][5] += arrayL1[vSumSaldo12][5];
						if (measure_count == 2) {
							arrayL1[vPos12][6] += arrayL1[vSumSaldo12][6];
							arrayL1[vPos12][7] += arrayL1[vSumSaldo12][7];
							arrayL1[vPos12][8] += (arrayL1[vSumSaldo12][5]/arrayL1[vSumSaldo12][6])-1;
						}
					}
				}				
			}
			
			var vPos13 = 0;			
			for (var vSumSaldo13 = 0;vSumSaldo13<arrayL1.length;vSumSaldo13++){ 
				if (arrayL1[vSumSaldo13][4] == 13) {
					vPos13 = arrayL1Aux.indexOf(arrayL1[vSumSaldo13][1]);
					if (vPos13 != -1) {
						arrayL1[vPos13][5] += arrayL1[vSumSaldo13][5];
						if (measure_count == 2) {
							arrayL1[vPos13][6] += arrayL1[vSumSaldo13][6];
							arrayL1[vPos13][7] += arrayL1[vSumSaldo13][7];
							arrayL1[vPos13][8] += (arrayL1[vSumSaldo13][5]/arrayL1[vSumSaldo13][6])-1;
						}
					}
				}				
			}
			
			var vPos14 = 0;			
			for (var vSumSaldo14 = 0;vSumSaldo14<arrayL1.length;vSumSaldo14++){ 
				if (arrayL1[vSumSaldo14][4] == 14) {
					vPos14 = arrayL1Aux.indexOf(arrayL1[vSumSaldo14][1]);
					if (vPos14 != -1) {
						arrayL1[vPos14][5] += arrayL1[vSumSaldo14][5];
						if (measure_count == 2) {
							arrayL1[vPos14][6] += arrayL1[vSumSaldo14][6];
							arrayL1[vPos14][7] += arrayL1[vSumSaldo14][7];
							arrayL1[vPos14][8] += (arrayL1[vSumSaldo14][5]/arrayL1[vSumSaldo14][6])-1;
						}
					}
				}				
			}
			}
			
			
			for (var vFinalWrite = 0;vFinalWrite<arrayL1.length;vFinalWrite++){
				
				html += '<tr><td style ="';
				html2 = "";
				switch (arrayL1[vFinalWrite][4]) {
					
					case 1:
					if(arrayL1[vFinalWrite][1] == vComments){
						html += levelPC2();
						html2 = levelPC2();
					}else{
						html += "";
						html2 = "";
					}
					break;
				
					case 2:
					html += levelPC2();
					html2 = levelPC2();
					break;
								
					case 3:
					if(vNumberOfLevels <3){	
						html += levelPC2();
						html2 = levelPC2();
					}else{
						html += levelPC3();
						html2 = levelPC3();
					}
					break;
								
					case 4:
					if(vNumberOfLevels <4){	
						if(vNumberOfLevels <3){	
							html += levelPC2();
							html2 = levelPC2();
						}else{
							html += levelPC3();
							html2 = levelPC3();
						}
					}else{
						html += levelPC4();
						html2 = levelPC4();
					}
					break;
								
					case 5:
					if(vNumberOfLevels <5){
						if(vNumberOfLevels <4){	
							if(vNumberOfLevels <3){	
								html += levelPC2();
								html2 = levelPC2();
							}else{
								html += levelPC3();
								html2 = levelPC3();
							}
						}else{
							html += levelPC4();
							html2 = levelPC4();
						}
					}else{
						html += levelPC5();
						html2 = levelPC5();
					}
					break;
					
					case 6:
					if(vNumberOfLevels <6){
						if(vNumberOfLevels <5){
							if(vNumberOfLevels <4){	
								if(vNumberOfLevels <3){	
									html += levelPC2();
									html2 = levelPC2();
								}else{
									html += levelPC3();
									html2 = levelPC3();
								}
							}else{
								html += levelPC4();
								html2 = levelPC4();
							}
						}else{
							html += levelPC5();
							html2 = levelPC5();
						}
					}else{
						html += levelPC6();
						html2 = levelPC6();
					}
					break;
									
					case 7:
					if(vNumberOfLevels <7){
						if(vNumberOfLevels <6){
							if(vNumberOfLevels <5){
								if(vNumberOfLevels <4){	
									if(vNumberOfLevels <3){	
										html += levelPC2();
										html2 = levelPC2();
									}else{
										html += levelPC3();
										html2 = levelPC3();
									}
								}else{
									html += levelPC4();
									html2 = levelPC4();
								}
							}else{
								html += levelPC5();
								html2 = levelPC5();
							}
						}else{
							html += levelPC6();
							html2 = levelPC6();
						}
					}else{
						html += levelPC7();
						html2 = levelPC7();
					}
					break;
					
					case 8:
					if(vNumberOfLevels <8){
						if(vNumberOfLevels <7){
							if(vNumberOfLevels <6){
								if(vNumberOfLevels <5){
									if(vNumberOfLevels <4){	
										if(vNumberOfLevels <3){	
											html += levelPC2();
											html2 = levelPC2();
										}else{
											html += levelPC3();
											html2 = levelPC3();
										}
									}else{
										html += levelPC4();
										html2 = levelPC4();
									}
								}else{
									html += levelPC5();
									html2 = levelPC5();
								}
							}else{
								html += levelPC6();
								html2 = levelPC6();
							}
						}else{
						html += levelPC7();
						html2 = levelPC7();
						}
					}else{
						html += levelPC8();
						html2 = levelPC8();
					}
					break;
				
					
						
					
					
					
					case 9:
					if(vNumberOfLevels <9){
						if(vNumberOfLevels <8){
							if(vNumberOfLevels <7){
								if(vNumberOfLevels <6){
									if(vNumberOfLevels <5){
										if(vNumberOfLevels <4){	
											if(vNumberOfLevels <3){	
												html += levelPC2();
												html2 = levelPC2();
											}else{
												html += levelPC3();
												html2 = levelPC3();
											}
										}else{
											html += levelPC4();
											html2 = levelPC4();
										}
									}else{
										html += levelPC5();
										html2 = levelPC5();
									}
								}else{
									html += levelPC6();
									html2 = levelPC6();
								}
							}else{
							html += levelPC7();
							html2 = levelPC7();
							}
						}else{
							html += levelPC8();
							html2 = levelPC8();
						}
					}else{
						html += levelPC9();
						html2 = levelPC9();
					}
					break;
				
					default:
					if(vNumberOfLevels <10){
						if(vNumberOfLevels <9){
						if(vNumberOfLevels <8){
							if(vNumberOfLevels <7){
								if(vNumberOfLevels <6){
									if(vNumberOfLevels <5){
										if(vNumberOfLevels <4){	
											if(vNumberOfLevels <3){	
												html += levelPC2();
												html2 = levelPC2();
											}else{
												html += levelPC3();
												html2 = levelPC3();
											}
										}else{
											html += levelPC4();
											html2 = levelPC4();
										}
									}else{
										html += levelPC5();
										html2 = levelPC5();
									}
								}else{
									html += levelPC6();
									html2 = levelPC6();
								}
							}else{
							html += levelPC7();
							html2 = levelPC7();
							}
						}else{
							html += levelPC8();
							html2 = levelPC8();
						}
					}else{
						html += levelPC9();
						html2 = levelPC9();
					}
					}else{
						html += levelPC10();
						html2 = levelPC10();
					}
									
					}
				
				vMeasure1 = addSeparators(arrayL1[vFinalWrite][5],layout.ThousandSep,layout.DecimalSep,layout.NumDecimals);
				
				if (measure_count == 2) {
					vMeasure2 = addSeparators(arrayL1[vFinalWrite][6],layout.ThousandSep,layout.DecimalSep,layout.NumDecimals);
					vMeasure3 = addSeparators(arrayL1[vFinalWrite][7],layout.ThousandSep,layout.DecimalSep,layout.NumDecimals);
					vMeasure4 = addSeparators(((arrayL1[vFinalWrite][5] / arrayL1[vFinalWrite][6])-1)*100,layout.ThousandSep,layout.DecimalSep,layout.NumDecimals);
					
					vMeasure2Tag = '<td style ="' + html2 + ';text-align:right">' + vMeasure2 + '</td>';
					vMeasure3Tag = '<td style ="' + html2 + ';text-align:right">' + vMeasure3 + '</td>';
					if (vMeasure4 == 'NaN') {
						vMeasure4Tag = '<td style ="' + html2 + ';text-align:right">' + '0%' + '</td>';
					}else{
						vMeasure4Tag = '<td style ="' + html2 + ';text-align:right">' + vMeasure4 + '%' + '</td>';
					}
					
				}else{
					vMeasure2Tag = "";
					vMeasure3Tag = "";
					vMeasure4Tag = "";
				}
				
				if (arrayL1[vFinalWrite][1] == vComments) {
					vMeasure1 = "";
					vMeasure2Tag = "";
					vMeasure3Tag = "";
					vMeasure4Tag = "";
				}
				
				if(vIndentMode){
					switch	(arrayL1[vFinalWrite][4]){
						case 1:
						vIndent = ';padding-left:45px">';
						break;
						case 2:
						vIndent = ';padding-left:30px">';
						break;
						case 3:
						vIndent = ';padding-left:15px">';
						break;
						default:
						vIndent = '">';
						break;
					}
				}else{
					vIndent = '">';
				}
				html += vIndent + arrayL1[vFinalWrite][2] + '</td>' + '<td style ="' + html2 + ';text-align:right">' + vMeasure1 + '</td>' + vMeasure2Tag + vMeasure3Tag + vMeasure4Tag + '</tr>';
			}
			
			}
			
			// end parent-child style
			
			var vExportNote = 'Foot Note>> ';
			if(myFootNote == "-"){
				vExportNote += 'none';
			}else{
				vExportNote += layout.footnote;
			}
			
			if (myFootNote.length>1) {
				html += "</tbody><tfoot><tr><td colspan='5' style ='background-color:#52CC52;color:white'>" + vExportNote + "</td></tr></tfoot></table></div>";
			}else{
				html += "</tbody></table></div>";
			}
			
			if(this.backendApi.getRowCount() > lastrow + 1) {
				html += "<button id='more'>More...</button>";
				morebutton = true;
			}
			
			html +="<div><button id='sendToExcel' style='background-color:#8AC007;color:white;border: 2px solid;border-radius: 25px;'>Send to Excel</button></div>";
			
			if (vStyle == 'parentchild' && vOKParentChild == 0) {
				html = "<div style = 'position:absolute;color:red;font-weight:bold;font-family: sans-serif;font-size: large;left:0px; top:" + yWorking.toString() + "px;font-size:" + FontSizeWorking.toString() + "px;'>The Parent-Child mode requires 3 dimensions: child + parent + desc (in this order) and 1 or 2 measures (current year revenue and last year revenue i.e.)!</div>";
			}
			$element.html(html);
			
			$element.find('#PLSmart').on('qv-activate', function() {
					
					var value3 = JSON.parse(JSON.stringify(dim));
					self.selectValues(dim, [value3], true);
					$(this).toggleClass("selected");
				});
			if(morebutton) {
				var requestPage = [{
					qTop : lastrow + 1,
					qLeft : 0,
					qWidth : 10, //should be # of columns
					qHeight : Math.min(100, this.backendApi.getRowCount() - lastrow)
				}];
				$element.find("#more").on("qv-activate", function() {
					self.backendApi.getData(requestPage).then(function(dataPages) {
					
						self.paint($element);
					});
				});
			}
			$element.find("#sendToExcel").on("qv-activate",function(e) {
				var $clonedDiv = $('#PLSmart').clone(true);
				var vEncodeHead = '<html><head><meta charset="UTF-8"></head>';
				var vEncode = encodeURIComponent($clonedDiv.html());
				var vDecode = vEncodeHead + vEncode + '</html>';
				$clonedDiv.find("tr.header");
				window.open('data:application/vnd.ms-excel,' +vDecode);
				e.preventDefault();
				
			});
						 			
			function onClickTable()
			{
				if(this.hasAttribute("data-value")) {
					var value = parseInt(this.getAttribute("data-value"), 10), dim = 0;
					if(layout.selectionMode === "CONFIRM") {
						self.selectValues(dim, [value], true);
						$(this).toggleClass("selected");
					} else {
						self.backendApi.selectValues(dim, [value], true);
					}
				}			
			};
			
			
			
			
			// Style for 14 levels Max
			function levelPC0()
			{
				var vReturnStylePC0 = "";
				switch (vColorSchema) {
					default: 
					vReturnStylePC0 = 'font-weight:bold';	
					break;
				}
				
				return (vReturnStylePC0);
			}
			
			function levelPC2()
			{
				var vReturnStylePC2 = "";
				switch (vColorSchema) {
					case '#ffffff': //clean
					vReturnStylePC2 = 'background-color:#ffffff;font-weight:bold';
					break;
				
					case '#efefef': //soft
					//vReturnStylePC2 = 'background-color:#f2f2f2';
					vReturnStylePC2 = 'background-color:#ffffff;font-weight:bold';
					break;
				
					case '#cccccc': //dark
					//vReturnStylePC2 = 'background-color:#d9d9d9';
					vReturnStylePC2 = 'background-color:#ffffff;font-weight:bold';
					break;
				
					case '#4575b4': //blue
					vReturnStylePC2 = 'background-color:#ffffff;font-weight:bold';
					break;
				
					case '#fff8e1': //orange
					vReturnStylePC2 = 'background-color:#ffffff;font-weight:bold';
					break;
				
					case '#da9694': //red
					vReturnStylePC2 = 'background-color:#ffffff;font-weight:bold';
					break;
					
					default: 
					vReturnStylePC2 = 'background-color:#ffffff';	
					break;
				}
				
				return (vReturnStylePC2);
			}
			
			
			function levelPC3()
			{
				var vReturnStylePC3 = "";
				switch (vColorSchema) {
					case '#ffffff': //clean
					vReturnStylePC3 = 'background-color:#ffffff;font-weight:bold';
					break;
				
					case '#efefef': //soft
					vReturnStylePC3 = 'background-color:#f2f2f2;font-weight:bold';
					break;
				
					case '#cccccc': //dark
					vReturnStylePC3 = 'background-color:#cdcdcd';
					break;
				
					case '#4575b4': //blue
					vReturnStylePC3 = 'background-color:#c9e8ff';
					break;
				
					case '#fff8e1': //orange
					vReturnStylePC3 = 'background-color:#fff8e1';
					break;
				
					case '#da9694': //red
					vReturnStylePC3 = 'background-color:#ffe1e1';
					break;
					
					default: 
					vReturnStylePC3 = 'background-color:#ffffff;font-weight:bold';	
					break;
				}
				
				return (vReturnStylePC3);
			}
			
			function levelPC4()
			{
				var vReturnStylePC4 = "";
				switch (vColorSchema) {
					case '#ffffff': //clean
					vReturnStylePC4 = 'background-color:#ffffff;font-weight:bold';
					break;
				
					case '#efefef': //soft
					vReturnStylePC4 = 'background-color:#d9d9d9;font-weight:bold';
					break;
				
					case '#cccccc': //dark
					vReturnStylePC4 = 'background-color:#c2c2c2';
					break;
				
					case '#4575b4': //blue
					vReturnStylePC4 = 'background-color:#c9e8ff;font-weight:bold';
					break;
				
					case '#fff8e1': //orange
					vReturnStylePC4 = 'background-color:#fff8e1;font-weight:bold';
					break;
				
					case '#da9694': //red
					vReturnStylePC4 = 'background-color:#ffe1e1;font-weight:bold';
					break;
					
					default: 
					vReturnStylePC4 = 'background-color:#ffffff;font-weight:bold';	
					break;
				}
				
				return (vReturnStylePC4);
			}
			
			function levelPC5()
			{
					
				var vReturnStylePC5 = "";
				switch (vColorSchema) {
					case '#ffffff': //clean
					vReturnStylePC5 = 'background-color:#ffffff;font-weight:bold';
					break;
				
					case '#efefef': //soft
					vReturnStylePC5 = 'background-color:#cdcdcd';
					break;
				
					case '#cccccc': //dark
					vReturnStylePC5 = 'background-color:#b0b0b0';
					break;
				
					case '#4575b4': //blue
					vReturnStylePC5 = 'background-color:#a7d9ff;font-weight:bold';
					break;
				
					case '#fff8e1': //orange
					vReturnStylePC5 = 'background-color:#ffeeb7;font-weight:bold';
					break;
				
					case '#da9694': //red
					vReturnStylePC5 = 'background-color:#ffbdbd;font-weight:bold';
					break;
					
					default: 
					vReturnStylePC5 = 'background-color:#ffffff;font-weight:bold';	
					break;
				}
				
				return (vReturnStylePC5);
			}
			
			function levelPC6()
			{
				var vReturnStylePC6 = "";
				switch (vColorSchema) {
					case '#ffffff': //clean
					vReturnStylePC6 = 'background-color:#ffffff;font-weight:bold';
					break;
				
					case '#efefef': //soft
					vReturnStylePC6 = 'background-color:#c2c2c2';
					break;
				
					case '#cccccc': //dark
					vReturnStylePC6 = 'background-color:#999999;color:white';
					break;
				
					case '#4575b4': //blue
					vReturnStylePC6 = 'background-color:#81c9ff;font-weight:bold';
					break;
				
					case '#fff8e1': //orange
					vReturnStylePC6 = 'background-color:#ffe697;font-weight:bold';
					break;
				
					case '#da9694': //red
					vReturnStylePC6 = 'background-color:#ff9b9b;font-weight:bold';
					break;
					
					default: 
					vReturnStylePC6 = 'background-color:#ffffff;font-weight:bold';	
					break;
				}
				
				return (vReturnStylePC6);
			}
			
			function levelPC7()
			{
				var vReturnStylePC7 = "";
				switch (vColorSchema) {
					case '#ffffff': //clean
					vReturnStylePC7 = 'background-color:#ffffff;font-weight:bold';
					break;
				
					case '#efefef': //soft
					vReturnStylePC7 = 'background-color:#b0b0b0;font-weight:bold';
					break;
				
					case '#cccccc': //dark
					vReturnStylePC7 = 'background-color:#797979;color:white;font-weight:bold';
					break;
				
					case '#4575b4': //blue
					vReturnStylePC7 = 'background-color:#5bb9ff;font-weight:bold';
					break;
				
					case '#fff8e1': //orange
					vReturnStylePC7 = 'background-color:#ffd757;font-weight:bold';
					break;
				
					case '#da9694': //red
					vReturnStylePC7 = 'background-color:#ff6d6d;color:white';
					break;
					
					default: 
					vReturnStylePC7 = 'background-color:#ffffff;font-weight:bold';	
					break;
				}
				
				return (vReturnStylePC7);
			}
			
			function levelPC8()
			{
				var vReturnStylePC8 = "";
				switch (vColorSchema) {
					case '#ffffff': //clean
					vReturnStylePC8 = 'background-color:#ffffff;font-weight:bold';
					break;
				
					case '#efefef': //soft
					vReturnStylePC8 = 'background-color:#9d9d9d;font-weight:bold;color:white';
					break;
				
					case '#cccccc': //dark
					vReturnStylePC8 = 'background-color:#565656;font-weight:bold;color:white';
					break;
				
					case '#4575b4': //blue
					vReturnStylePC8 = 'background-color:#2fa6ff;font-weight:bold;color:white';
					break;
				
					case '#fff8e1': //orange
					vReturnStylePC8 = 'background-color:#ffc819;font-weight:bold;color:white';
					break;
				
					case '#da9694': //red
					vReturnStylePC8 = 'background-color:#ff2929;font-weight:bold;color:white';
					break;
					
					default: 
					vReturnStylePC8 = 'background-color:#ffffff;font-weight:bold';	
					break;
				}
				
				return (vReturnStylePC8);
			}
			
			function levelPC9()
			{
				var vReturnStylePC9 = "";
				switch (vColorSchema) {
					case '#ffffff': //clean
					vReturnStylePC9 = 'background-color:#ffffff;font-weight:bold';
					break;
				
					case '#efefef': //soft
					vReturnStylePC9 = 'background-color:#808080;font-weight:bold;color:white';
					break;
				
					case '#cccccc': //dark
					vReturnStylePC9 = 'background-color:#404040;font-weight:bold;color:white';
					break;
				
					case '#4575b4': //blue
					vReturnStylePC9 = 'background-color:#0088ee;font-weight:bold;color:white';
					break;
				
					case '#fff8e1': //orange
					vReturnStylePC9 = 'background-color:#e6af00;font-weight:bold;color:white';
					break;
				
					case '#da9694': //red
					vReturnStylePC9 = 'background-color:#e60000;font-weight:bold;color:white';
					break;
					
					default: 
					vReturnStylePC9 = 'background-color:#ffffff;font-weight:bold';	
					break;
				}
				
				return (vReturnStylePC9);
			}
			
			function levelPC10()
			{
				var vReturnStylePC10 = "";
				switch (vColorSchema) {
					case '#ffffff': //clean
					vReturnStylePC10 = 'background-color:#ffffff;font-weight:bold';
					break;
				
					case '#efefef': //soft
					vReturnStylePC10 = 'background-color:#808080;font-weight:bold;color:white';
					break;
				
					case '#cccccc': //dark
					vReturnStylePC10 = 'background-color:#323232;font-weight:bold;color:white';
					break;
				
					case '#4575b4': //blue
					vReturnStylePC10 = 'background-color:#0070c0;font-weight:bold;color:white';
					break;
				
					case '#fff8e1': //orange
					vReturnStylePC10 = 'background-color:#b48900;font-weight:bold;color:white';
					break;
				
					case '#da9694': //red
					vReturnStylePC10 = 'background-color:#c00000;font-weight:bold;color:white';
					break;
					
					default: 
					vReturnStylePC10 = 'background-color:#ffffff;font-weight:bold';	
					break;
				}
				
				return (vReturnStylePC10);
			}
			// End Style 14 levels
			
			
			function onlyUnique(value, index, self)
			{ 
				return self.indexOf(value) === index;
			};
			function addSeparators (nStr, thousandsSep, decimalSep, numDecimals) {
				var rgx, x, x1, x2;
				nStr = nStr.toFixed(numDecimals);
				x = nStr.split('.');
				x1 = x[0];
				x2 = x.length > 1 ? decimalSep + x[1] : '';
				rgx = /(\d+)(\d{3})/;
				while (rgx.test(x1)) {
				  x1 = x1.replace(rgx, '$1' + thousandsSep + '$2');
				}
				return x1 + x2;
			};
			
		}
	};
});
