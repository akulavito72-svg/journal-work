import { prisma } from "./prisma";

const defaultWorkTypes = [
  {
    name: "Монтаж",
    description: "Монтажные работы"
  },
  {
    name: "Демонтаж",
    description: "Демонтажные работы"
  },
  {
    name: "Отделка",
    description: "Отделочные работы"
  },
  {
    name: "Электрика",
    description: "Электромонтажные работы"
  },
  {
    name: "Сантехника",
    description: "Сантехнические работы"
  },
  {
    name: "Земляные работы",
    description: "Подготовка и земляные работы"
  }
];

export async function seedDefaultWorkTypes() {
  await prisma.$transaction(
    defaultWorkTypes.map((workType) =>
      prisma.workType.upsert({
        where: { name: workType.name },
        create: workType,
        update: {
          description: workType.description,
          isActive: true
        }
      })
    )
  );
}
