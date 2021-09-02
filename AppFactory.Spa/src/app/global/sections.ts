export class Section {
    name: string;
    route: string;
    shortcut: string;
} 

export const SECTIONS: Section[] = [
    { name: "Database", route: "/database", shortcut: "d"},
    { name: "BackEnd", route: "", shortcut: "b" }, 
    { name: "FrontEnd", route: "", shortcut: "f" },
    { name: "Styles", route: "", shortcut: "s" },
    { name: "Languages", route: "", shortcut: "l" },
    { name: "Git", route: "", shortcut: "g" },
];

