import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  glowColor?: 'cyan' | 'magenta' | 'blue';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  glowColor = 'cyan',
  children,
  className,
  ...props
}) => {
  const baseClasses = "font-orbitron uppercase tracking-wider relative overflow-hidden transition-all duration-300 flex items-center justify-center";
  
  const variantClasses = {
    primary: "bg-transparent border-2 hover:bg-opacity-20 after:absolute after:inset-0 after:opacity-0 hover:after:opacity-100 after:transition-opacity",
    secondary: "bg-black/30 backdrop-blur-sm border hover:bg-black/50",
    outline: "bg-transparent border hover:bg-black/30"
  };
  
  const colorClasses = {
    cyan: "border-cyan-glow text-cyan-glow after:bg-cyan-glow/10 hover:border-cyan-glow/80",
    magenta: "border-magenta-glow text-magenta-glow after:bg-magenta-glow/10 hover:border-magenta-glow/80",
    blue: "border-electric-blue text-electric-blue after:bg-electric-blue/10 hover:border-electric-blue/80"
  };
  
  const sizeClasses = {
    sm: "text-xs px-4 py-2 rounded",
    md: "text-sm px-6 py-3 rounded",
    lg: "text-base px-8 py-4 rounded-md"
  };
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${colorClasses[glowColor]} ${sizeClasses[size]} ${className || ''}`;
  
  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;