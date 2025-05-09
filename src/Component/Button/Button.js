import classNames from "classnames/bind";
import styles from "./Button.module.scss";

const cx = classNames.bind(styles);

function Button({
    title,
    leftIcon,
    rightIcon,
    isPrimary,
    isBorder,
    isRadius,
    classN,
    onClick,
    ...props
}) {
    const prop = { ...props, onClick };

    const classes = cx("wrapper", {
        [classN]: classN,
        isPrimary,
        isBorder,
        isRadius,
    });

    return (
        <button className={classes} {...prop}>
            {title}
        </button>
    );
}

export default Button;
