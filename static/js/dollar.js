/**
 * The $1 Unistroke Recognizer (C# version)
 *
 *		Jacob O. Wobbrock, Ph.D.
 * 		The Information School
 *		University of Washington
 *		Mary Gates Hall, Box 352840
 *		Seattle, WA 98195-2840
 *		wobbrock@uw.edu
 *
 *		Andrew D. Wilson, Ph.D.
 *		Microsoft Research
 *		One Microsoft Way
 *		Redmond, WA 98052
 *		awilson@microsoft.com
 *
 *		Yang Li, Ph.D.
 *		Department of Computer Science and Engineering
 * 		University of Washington
 *		The Allen Center, Box 352350
 *		Seattle, WA 98195-2840
 * 		yangli@cs.washington.edu
 *
 * The Protractor enhancement was published by Yang Li and programmed here by 
 * Jacob O. Wobbrock.
 *
 *	Li, Y. (2010). Protractor: A fast and accurate gesture 
 *	  recognizer. Proceedings of the ACM Conference on Human 
 *	  Factors in Computing Systems (CHI '10). Atlanta, Georgia
 *	  (April 10-15, 2010). New York: ACM Press, pp. 2169-2172.
 * 
 * This software is distributed under the "New BSD License" agreement:
 * 
 * Copyright (c) 2007-2011, Jacob O. Wobbrock, Andrew D. Wilson and Yang Li.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *    * Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *    * Neither the names of the University of Washington nor Microsoft,
 *      nor the names of its contributors may be used to endorse or promote 
 *      products derived from this software without specific prior written
 *      permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Jacob O. Wobbrock OR Andrew D. Wilson
 * OR Yang Li BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, 
 * OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF 
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS 
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
**/
//
// Point class
//
function Point(x, y) // constructor
{
	this.X = x;
	this.Y = y;
}
//
// Rectangle class
//
function Rectangle(x, y, width, height) // constructor
{
	this.X = x;
	this.Y = y;
	this.Width = width;
	this.Height = height;
}
//
// Template class: a unistroke template
//
function Template(name, points) // constructor
{
	this.Name = name;
	this.Points = Resample(points, NumPoints);
	var radians = IndicativeAngle(this.Points);
	this.Points = RotateBy(this.Points, -radians);
	this.Points = ScaleTo(this.Points, SquareSize);
	this.Points = TranslateTo(this.Points, Origin);
	this.Vector = Vectorize(this.Points); // for Protractor
}
//
// Result class
//
function Result(name, score) // constructor
{
	this.Name = name;
	this.Score = score;
}
//
// DollarRecognizer class constants
//
var NumTemplates = 16;
var NumPoints = 64;
var SquareSize = 250.0;
var Origin = new Point(0,0);
var Diagonal = Math.sqrt(SquareSize * SquareSize + SquareSize * SquareSize);
var HalfDiagonal = 0.5 * Diagonal;
var AngleRange = Deg2Rad(45.0);
var AnglePrecision = Deg2Rad(2.0);
var Phi = 0.5 * (-1.0 + Math.sqrt(5.0)); // Golden Ratio
//
// DollarRecognizer class
//
function DollarRecognizer() // constructor
{
	//
	// one predefined template for each unistroke type
	//
	this.Templates = new Array();
    this.Templates[0]=new Template("Line",new Array(new Point(101,60),new Point(106,60),new Point(106,60),new Point(108,60),new Point(112,60),new Point(112,60),new Point(117,60),new Point(117,60),new Point(122,60),new Point(122,60),new Point(127,60),new Point(128,60),new Point(128,60),new Point(133,60),new Point(133,60),new Point(138,60),new Point(138,60),new Point(144,60),new Point(144,60),new Point(149,60),new Point(149,60),new Point(154,60),new Point(154,60),new Point(154,60),new Point(159,60),new Point(159,60),new Point(165,60),new Point(165,60),new Point(170,60),new Point(170,60),new Point(175,60),new Point(175,60),new Point(181,60),new Point(181,60),new Point(183,60),new Point(186,60),new Point(186,60),new Point(191,60),new Point(191,60),new Point(197,60),new Point(197,60),new Point(202,60),new Point(202,60),new Point(207,60),new Point(207,60),new Point(213,60),new Point(213,60),new Point(218,60),new Point(218,60),new Point(218,60),new Point(223,60),new Point(223,60),new Point(229,60),new Point(229,60),new Point(234,60),new Point(234,60),new Point(239,60),new Point(239,60),new Point(245,60),new Point(245,60),new Point(250,60),new Point(250,60),new Point(253,60),new Point(255,60),new Point(255,60),new Point(261,60),new Point(261,60),new Point(266,60),new Point(266,60),new Point(271,60),new Point(271,60),new Point(276,60),new Point(276,60),new Point(282,60),new Point(282,60),new Point(287,60),new Point(287,60),new Point(290,60),new Point(292,60),new Point(292,60),new Point(298,60),new Point(298,60),new Point(303,60),new Point(303,60),new Point(308,60),new Point(308,60),new Point(314,60),new Point(314,60),new Point(319,60),new Point(319,60),new Point(324,60),new Point(324,60),new Point(325,60),new Point(330,60),new Point(330,60),new Point(335,60),new Point(335,60),new Point(340,60),new Point(340,60),new Point(346,60),new Point(346,60),new Point(351,60),new Point(351,60),new Point(356,60),new Point(356,60),new Point(356,60),new Point(362,60),new Point(362,60),new Point(367,60),new Point(367,60),new Point(372,60),new Point(372,60),new Point(378,60),new Point(378,60),new Point(383,60),new Point(383,60),new Point(385,60),new Point(388,60),new Point(388,60),new Point(393,60),new Point(393,60),new Point(399,60),new Point(399,60),new Point(404,60),new Point(404,60),new Point(408,60),new Point(409,60),new Point(409,60),new Point(415,60),new Point(415,60),new Point(420,60),new Point(420,60),new Point(425,60),new Point(425,60),new Point(425,60),new Point(431,60),new Point(431,60),new Point(434,60),new Point(436,60),new Point(436,60),new Point(436,60)));
    this.Templates.push("Circle",new Array(new Point(282,146),new Point(281,146),new Point(280,146),new Point(279,146),new Point(278,146),new Point(275,146),new Point(275,146),new Point(275,146),new Point(274,146),new Point(273,146),new Point(271,146),new Point(269,145),new Point(267,145),new Point(267,145),new Point(266,145),new Point(265,145),new Point(263,145),new Point(261,144),new Point(260,144),new Point(260,144),new Point(259,144),new Point(258,144),new Point(255,143),new Point(254,143),new Point(253,143),new Point(253,143),new Point(253,143),new Point(251,141),new Point(249,141),new Point(248,141),new Point(247,140),new Point(247,140),new Point(246,140),new Point(245,140),new Point(244,140),new Point(243,140),new Point(242,140),new Point(241,140),new Point(240,140),new Point(239,140),new Point(239,140),new Point(239,140),new Point(238,140),new Point(235,141),new Point(234,142),new Point(233,143),new Point(233,143),new Point(233,143),new Point(230,144),new Point(228,146),new Point(227,147),new Point(227,147),new Point(227,147),new Point(225,149),new Point(223,151),new Point(222,152),new Point(222,152),new Point(222,152),new Point(220,155),new Point(218,157),new Point(217,158),new Point(217,158),new Point(217,158),new Point(215,161),new Point(214,163),new Point(213,164),new Point(213,164),new Point(213,165),new Point(212,167),new Point(212,168),new Point(210,171),new Point(210,171),new Point(210,171),new Point(209,173),new Point(209,175),new Point(209,176),new Point(208,178),new Point(208,178),new Point(208,178),new Point(208,180),new Point(207,181),new Point(207,183),new Point(207,185),new Point(207,185),new Point(207,185),new Point(207,187),new Point(207,188),new Point(207,191),new Point(207,192),new Point(207,192),new Point(207,193),new Point(207,196),new Point(207,198),new Point(207,200),new Point(207,200),new Point(207,201),new Point(207,203),new Point(208,206),new Point(208,207),new Point(208,207),new Point(209,208),new Point(211,211),new Point(212,213),new Point(212,213),new Point(212,213),new Point(215,215),new Point(218,218),new Point(218,218),new Point(218,218),new Point(222,222),new Point(223,223),new Point(223,223),new Point(229,227),new Point(229,227),new Point(229,227),new Point(235,232),new Point(235,232),new Point(235,232),new Point(241,236),new Point(241,236),new Point(242,236),new Point(248,239),new Point(248,239),new Point(250,240),new Point(255,242),new Point(255,242),new Point(261,245),new Point(261,245),new Point(264,246),new Point(268,248),new Point(268,248),new Point(274,251),new Point(275,251),new Point(275,251),new Point(282,252),new Point(282,252),new Point(283,252),new Point(289,254),new Point(289,254),new Point(292,255),new Point(297,255),new Point(297,255),new Point(298,255),new Point(299,257),new Point(303,257),new Point(303,257),new Point(303,257),new Point(307,258),new Point(310,258),new Point(310,258),new Point(311,258),new Point(315,258),new Point(317,259),new Point(317,259),new Point(321,260),new Point(324,260),new Point(324,260),new Point(327,260),new Point(332,260),new Point(332,260),new Point(332,260),new Point(337,260),new Point(339,260),new Point(339,260),new Point(341,260),new Point(346,260),new Point(347,260),new Point(347,260),new Point(351,260),new Point(352,260),new Point(353,260),new Point(354,260),new Point(354,260),new Point(354,260),new Point(357,259),new Point(359,257),new Point(360,256),new Point(360,256),new Point(361,255),new Point(364,253),new Point(365,251),new Point(365,251),new Point(365,251),new Point(367,248),new Point(369,244),new Point(369,244),new Point(369,244),new Point(369,242),new Point(370,238),new Point(370,237),new Point(370,237),new Point(370,233),new Point(370,230),new Point(370,230),new Point(370,228),new Point(370,223),new Point(370,222),new Point(370,222),new Point(370,219),new Point(370,216),new Point(370,215),new Point(370,215),new Point(370,213),new Point(370,210),new Point(369,208),new Point(369,208),new Point(369,207),new Point(368,204),new Point(366,202),new Point(366,201),new Point(366,201),new Point(365,199),new Point(364,196),new Point(363,194),new Point(363,194),new Point(363,193),new Point(362,191),new Point(362,190),new Point(361,188),new Point(361,188),new Point(361,188),new Point(360,187),new Point(359,185),new Point(356,183),new Point(356,182),new Point(356,182),new Point(355,181),new Point(354,180),new Point(352,178),new Point(351,178),new Point(351,178),new Point(351,178),new Point(350,177),new Point(348,175),new Point(347,174),new Point(345,173),new Point(345,173),new Point(345,173),new Point(343,172),new Point(341,171),new Point(340,170),new Point(339,169),new Point(339,169),new Point(339,169),new Point(338,169),new Point(336,168),new Point(335,168),new Point(332,167),new Point(332,167),new Point(332,167),new Point(331,167),new Point(329,165),new Point(328,165),new Point(327,165),new Point(326,165),new Point(325,164),new Point(325,164),new Point(325,164),new Point(322,164),new Point(321,164),new Point(319,163),new Point(318,163),new Point(318,163),new Point(318,163),new Point(317,163),new Point(316,163),new Point(315,163),new Point(313,163),new Point(311,162),new Point(311,162),new Point(311,162),new Point(310,162),new Point(308,162),new Point(306,160),new Point(305,160),new Point(305,160),new Point(305,160),new Point(302,159),new Point(301,159),new Point(300,158),new Point(298,158),new Point(298,158),new Point(298,158),new Point(297,158),new Point(296,158),new Point(294,157),new Point(293,157),new Point(292,157),new Point(291,157),new Point(291,157),new Point(291,157),new Point(290,156),new Point(289,155),new Point(288,155),new Point(287,155),new Point(286,154),new Point(285,154),new Point(285,154),new Point(285,154),new Point(284,153),new Point(283,153),new Point(282,152),new Point(281,152),new Point(280,152),new Point(278,152)));
	//
	// The $1 Gesture Recognizer API begins here -- 3 methods
	//
	this.Recognize = function(points, useProtractor)
	{
		points = Resample(points, NumPoints);
		var radians = IndicativeAngle(points);
		points = RotateBy(points, -radians);
		points = ScaleTo(points, SquareSize);
		points = TranslateTo(points, Origin);
		var vector = Vectorize(points); // for Protractor
	
		var b = +Infinity;
		var t = 0;
		for (var i = 0; i < this.Templates.length; i++) // for each unistroke template
		{
			var d;
			if (useProtractor) // for Protractor
			{
				d = OptimalCosineDistance(this.Templates[i].Vector, vector);
			}
			else // Golden Section Search (original $1)
			{
				d = DistanceAtBestAngle(points, this.Templates[i], -AngleRange, +AngleRange, AnglePrecision);
			}
			if (d < b)
			{
				b = d; // best (least) distance
				t = i; // unistroke template
			}
		}
		return new Result(this.Templates[t].Name, useProtractor ? 1.0 / b : 1.0 - b / HalfDiagonal);
	};
	//
	// add/delete new templates
	//
	this.AddTemplate = function(name, points)
	{
		this.Templates[this.Templates.length] = new Template(name, points); // append new template
		var num = 0;
		for (var i = 0; i < this.Templates.length; i++)
		{
			if (this.Templates[i].Name == name)
				num++;
		}
		return num;
	}
	this.DeleteUserTemplates = function()
	{
		this.Templates.length = NumTemplates; // clear any beyond the original set
		return NumTemplates;
	}
}
//
// Private helper functions from this point down
//
function Resample(points, n)
{
	var I = PathLength(points) / (n - 1); // interval length
	var D = 0.0;
	var newpoints = new Array(points[0]);
	for (var i = 1; i < points.length; i++)
	{
		var d = Distance(points[i - 1], points[i]);
		if ((D + d) >= I)
		{
			var qx = points[i - 1].X + ((I - D) / d) * (points[i].X - points[i - 1].X);
			var qy = points[i - 1].Y + ((I - D) / d) * (points[i].Y - points[i - 1].Y);
			var q = new Point(qx, qy);
			newpoints[newpoints.length] = q; // append new point 'q'
			points.splice(i, 0, q); // insert 'q' at position i in points s.t. 'q' will be the next i
			D = 0.0;
		}
		else D += d;
	}
	// somtimes we fall a rounding-error short of adding the last point, so add it if so
	if (newpoints.length == n - 1)
	{
		newpoints[newpoints.length] = new Point(points[points.length - 1].X, points[points.length - 1].Y);
	}
	return newpoints;
}
function IndicativeAngle(points)
{
	var c = Centroid(points);
	return Math.atan2(c.Y - points[0].Y, c.X - points[0].X);
}	
function RotateBy(points, radians) // rotates points around centroid
{
	var c = Centroid(points);
	var cos = Math.cos(radians);
	var sin = Math.sin(radians);
	
	var newpoints = new Array();
	for (var i = 0; i < points.length; i++)
	{
		var qx = (points[i].X - c.X) * cos - (points[i].Y - c.Y) * sin + c.X
		var qy = (points[i].X - c.X) * sin + (points[i].Y - c.Y) * cos + c.Y;
		newpoints[newpoints.length] = new Point(qx, qy);
	}
	return newpoints;
}
function ScaleTo(points, size) // non-uniform scale; assumes 2D gestures (i.e., no lines)
{
	var B = BoundingBox(points);
	var newpoints = new Array();
	for (var i = 0; i < points.length; i++)
	{
		var qx = points[i].X * (size / B.Width);
		var qy = points[i].Y * (size / B.Height);
		newpoints[newpoints.length] = new Point(qx, qy);
	}
	return newpoints;
}			
function TranslateTo(points, pt) // translates points' centroid
{
	var c = Centroid(points);
	var newpoints = new Array();
	for (var i = 0; i < points.length; i++)
	{
		var qx = points[i].X + pt.X - c.X;
		var qy = points[i].Y + pt.Y - c.Y;
		newpoints[newpoints.length] = new Point(qx, qy);
	}
	return newpoints;
}
function Vectorize(points) // for Protractor
{
	var sum = 0.0;
	var vector = new Array();
	for (var i = 0; i < points.length; i++)
	{
		vector[vector.length] = points[i].X;
		vector[vector.length] = points[i].Y;
		sum += points[i].X * points[i].X + points[i].Y * points[i].Y;
	}
	var magnitude = Math.sqrt(sum);
	for (var i = 0; i < vector.length; i++)
		vector[i] /= magnitude;
	return vector;
}
function OptimalCosineDistance(v1, v2) // for Protractor
{
	var a = 0.0;
	var b = 0.0;
	for (var i = 0; i < v1.length; i += 2)
	{
		a += v1[i] * v2[i] + v1[i + 1] * v2[i + 1];
                b += v1[i] * v2[i + 1] - v1[i + 1] * v2[i];
	}
	var angle = Math.atan(b / a);
	return Math.acos(a * Math.cos(angle) + b * Math.sin(angle));
}
function DistanceAtBestAngle(points, T, a, b, threshold)
{
	var x1 = Phi * a + (1.0 - Phi) * b;
	var f1 = DistanceAtAngle(points, T, x1);
	var x2 = (1.0 - Phi) * a + Phi * b;
	var f2 = DistanceAtAngle(points, T, x2);
	while (Math.abs(b - a) > threshold)
	{
		if (f1 < f2)
		{
			b = x2;
			x2 = x1;
			f2 = f1;
			x1 = Phi * a + (1.0 - Phi) * b;
			f1 = DistanceAtAngle(points, T, x1);
		}
		else
		{
			a = x1;
			x1 = x2;
			f1 = f2;
			x2 = (1.0 - Phi) * a + Phi * b;
			f2 = DistanceAtAngle(points, T, x2);
		}
	}
	return Math.min(f1, f2);
}			
function DistanceAtAngle(points, T, radians)
{
	var newpoints = RotateBy(points, radians);
	return PathDistance(newpoints, T.Points);
}	
function Centroid(points)
{
	var x = 0.0, y = 0.0;
	for (var i = 0; i < points.length; i++)
	{
		x += points[i].X;
		y += points[i].Y;
	}
	x /= points.length;
	y /= points.length;
	return new Point(x, y);
}	
function BoundingBox(points)
{
	var minX = +Infinity, maxX = -Infinity, minY = +Infinity, maxY = -Infinity;
	for (var i = 0; i < points.length; i++)
	{
		if (points[i].X < minX)
			minX = points[i].X;
		if (points[i].X > maxX)
			maxX = points[i].X;
		if (points[i].Y < minY)
			minY = points[i].Y;
		if (points[i].Y > maxY)
			maxY = points[i].Y;
	}
	return new Rectangle(minX, minY, maxX - minX, maxY - minY);
}	
function PathDistance(pts1, pts2)
{
	var d = 0.0;
	for (var i = 0; i < pts1.length; i++) // assumes pts1.length == pts2.length
		d += Distance(pts1[i], pts2[i]);
	return d / pts1.length;
}
function PathLength(points)
{
	var d = 0.0;
	for (var i = 1; i < points.length; i++)
		d += Distance(points[i - 1], points[i]);
	return d;
}		
function Distance(p1, p2)
{
	var dx = p2.X - p1.X;
	var dy = p2.Y - p1.Y;
	return Math.sqrt(dx * dx + dy * dy);
}
function Deg2Rad(d) { return (d * Math.PI / 180.0); }
function Rad2Deg(r) { return (r * 180.0 / Math.PI); }
