/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */
import {COLORS} from "../helpers/colors.ts";

class Computer {
  public cpu: string = "cpu - not defined";
  public ram: string = "ram - not defined";
  public storage: string = "storage - not defined";
  public gpu?: string;

  displayConfiguration() {
    const config =
      `Configuracion de la computadora
      CPU: ${this.cpu}
      RAM: ${this.ram}
      Almacenamiento ${this.storage}
      GPU: ${this.gpu ?? 'No tiene GPU'}`;

    console.log(config);
  }
}

class ComputerBuilder {
  private computer: Computer;

  constructor() {
    this.computer = new Computer(); //* Nueva instancia
  }

  setCPU(cpu: string): ComputerBuilder {
    this.computer.cpu = cpu;

    return this; // Retorna la instancia de la clase
  }

  setRAM(ram: string): ComputerBuilder {
    this.computer.ram = ram;

    return this;
  }

  setStorage(storage: string): ComputerBuilder {
    this.computer.storage = storage;

    return this;
  }

  setGPU(gpu: string): ComputerBuilder {
    this.computer.gpu = gpu;

    return this;
  }

  //* Metodo para construir el objeto
  build() {
    return this.computer;
  }
}

function main() {
  const basicComputer = new ComputerBuilder()
    .setCPU("Intel Core 2 Duo")
    .setRAM("4GB")
    .setStorage('256GB')
    .build();
  
  console.log('%cComputer build successfully:', COLORS.blue);
  basicComputer.displayConfiguration();
  
  const gamerComputer = new ComputerBuilder()
    .setCPU("Ryzen 9 9700X")
    .setRAM('64GB')
    .setStorage('4TB')
    .setGPU('RTX 5070 TI 16GB')
    .build();
  
  console.log('%cComputer build successfully:', COLORS.orange);
  gamerComputer.displayConfiguration();
}

main();
