import type React from "react";

// definerer hvilken type props knappen kan ta imot
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "danger";
}

const Button = ({
variant = "primary",
    children, 
    ...rest
}: ButtonProps) => {
    // felles styling for alle knaper
    const base = "px-4 py-2 font-semibold rounded border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-tennisGreen";

    // styling for hver variant
    const variants = {
        primary: "bg-tennisGreen text-white border-tennisGreen hover:bg-white hover:text-tennisGreen hover:border-tennisGreen active:bg-white active:text-tennisGreen",
        secondary: "bg-tennisSand text-tennisGreen border-tennisGreen hover:border-tennisGreen active:bg-tennisGreen hover:text-white",
        danger: "bg-tennisOrange text-white hover:bg-white hover:text-tennisOrange border-tennisOrange",
    };

    return(
        // kombinerer base + valgt variant. Sender videre rest-props til knappen
        <button className={`${base} ${variants[variant]}`} {...rest}
        >{children}</button>
    );
};

export default Button;