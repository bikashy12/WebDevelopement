var fs = require("fs");
var input = fs.readFileSync("./input.txt").toString().trim().split("\n");
//fill your code
class Shape {
  constructor(name) {
    this.name = name;
  }
  calculatePerimeter(shapePerimeter) {
    console.log(`Perimeter of a ${this.name}: ${shapePerimeter}`);
  }
  calculateArea(shapeArea) {
    console.log(`Area of a ${this.name}: ${shapeArea}`);
  }
}

class Circle extends Shape {
  constructor(name, radius) {
    super(name);
    this.radius = radius;
  }
  displayCircleMeasurments() {
    // let circleArea = (22 / 7) * Math.pow(radius * 2);
    // let circlePerimeter = (44 / 7) * radius;
    super.calculatePerimeter(2 * 3.14 * this.radius);
    super.calculateArea(3.14 * Math.pow(this.radius, 2));
  }
}

class Square extends Shape {
  constructor(name, side) {
    super(name);
    this.side = side;
  }
  displaySquareMeasurments() {
    // let squareArea = side * side;
    // let squarePerimeter = 4 * side;
    super.calculatePerimeter(4 * this.side);
    super.calculateArea(this.side * this.side);
  }
}

class Triangle extends Shape {
  constructor(name, side1, side2, side3, base, height) {
    super(name);
    this.side1 = side1;
    this.side2 = side2;
    this.side3 = side3;
    this.base = base;
    this.height = height;
  }
  displayTriangleMeasurments() {
    // let triangleArea = 0.5 * base * height;
    // let trianglePerimeter = side1 + side2 + side3;
    super.calculatePerimeter(this.side1 + this.side2 + this.side3);
    super.calculateArea(0.5 * this.base * this.height);
  }
}

var shapeNameCircle = input[0].split(",");
var c = new Circle(shapeNameCircle[0], Number(shapeNameCircle[1]));
c.displayCircleMeasurments();

var shapeNameSquare = input[1].split(",");
var c = new Square(shapeNameSquare[0], Number(shapeNameSquare[1]));
c.displaySquareMeasurments();

var shapeNameTriangle = input[2].split(",");
var c = new Triangle(
  shapeNameTriangle[0],
  Number(shapeNameTriangle[1]),
  Number(shapeNameTriangle[2]),
  Number(shapeNameTriangle[3]),
  Number(shapeNameTriangle[4]),
  Number(shapeNameTriangle[5])
);
c.displayTriangleMeasurments();
