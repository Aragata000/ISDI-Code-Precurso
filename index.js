const trimDecimals = (number) =>
  Number.isInteger(number) ? number : number.toFixed(3);

const addition = (...args) => {
  const sum = args.reduce((accumulator, current) => accumulator + current, 0);
  return trimDecimals(sum);
};
const substraction = (...args) => {
  return args.reduce((accumulator, current) => {
    accumulator -= current;
    return trimDecimals(accumulator);
  });
};
const multiply = (...args) => {
  return args.reduce((accumulator, current) => {
    accumulator *= current;
    return trimDecimals(accumulator);
  });
};
const division = (...args) => {
  return args.reduce((accumulator, current) => {
    if (current) {
      accumulator /= current;
      return trimDecimals(accumulator);
    } else {
      return "no puedo dividir por 0";
    }
  });
};

const lastCuestion = () => {
  const cuestion = prompt(
    "Desea introducir otros números para calcular? 'yes / no'"
  );
  if (cuestion === null) {
    lastCuestion();
  } else if (
    cuestion.toLowerCase() !== "yes" &&
    cuestion.toLowerCase() !== "no"
  ) {
    alert("Debe introducir yes / no");
    lastCuestion();
  } else if (cuestion.toLowerCase() === "no") {
    alert("Adios!");
  } else {
    return runCalculator();
  }
};

const runCalculator = (initialMessage) => {
  const message = `${
    initialMessage || "Bienvenido a la calculadora"
  }\nPor favor, introduce los números que desee calcular separados por espacio`;

  const userInput = prompt(message);

  if (!userInput) {
    return console.error("Ningún valor detectado. Terminando programa...");
  }

  const parsedInput = userInput.split(" ").map((input) => Number(input));

  if (parsedInput.some((input) => Number.isNaN(input))) {
    runCalculator("Lo siento, solo acepto números.");
  }

  if (parsedInput.length === 1) {
    const number = parsedInput[0];
    if (number < 0) {
      return runCalculator(
        "Los números negativos no tiene raíz no tienen cuadrada"
      );
    }
    const squareRoot = Math.sqrt(number);
    return runCalculator(
      `La raíz cuadrada de ${number} es ${trimDecimals(squareRoot)}.`
    );
  }
  const resultAddition = addition(...parsedInput);
  const additionOutput = `La suma de los valores es: ${resultAddition}`;
  const resultSubstraction = substraction(...parsedInput);
  const substractionOutput = `La resta de los valores es: ${resultSubstraction}`;
  const resultMultiply = multiply(...parsedInput);
  const multiplyOutput = `La multiplicación de los valores es: ${resultMultiply}`;
  const resultDivide = division(...parsedInput);
  const divisionOutput = `La división de los valores es: ${resultDivide}`;

  const results = [
    additionOutput,
    substractionOutput,
    multiplyOutput,
    divisionOutput,
  ];
  alert(results.map((operation) => `${operation}\n`).join(""));
  return lastCuestion();
};

runCalculator();
