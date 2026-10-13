import './StarBorder.css';

const StarBorder = ({
  as: Component = 'button',
  className = '',
  color = 'white',
  speed = '6s',
  thickness = 1,
  backgroundColor = '#000000',
  textColor = '#ffffff',
  borderColor = '#222222',
  children,
  style,
  ...rest
}) => {
  return (
    <Component
      className={`star-border-container ${className}`.trim()}
      style={{ padding: `${thickness}px 0`, ...style }}
      {...rest}
    >
      <span
        className="border-gradient-bottom"
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 68%)`,
          animationDuration: speed,
        }}
      />
      <span
        className="border-gradient-top"
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 68%)`,
          animationDuration: speed,
        }}
      />
      <span
        className="inner-content"
        style={{ background: backgroundColor, color: textColor, borderColor }}
      >
        {children}
      </span>
    </Component>
  );
};

export default StarBorder;
