import styles from './Button.module.scss';

function Button(props: any) {
    return (
        <button type='button' className={`${props.className} ${styles.btn}`} onClick={props.onClick}>
            {props.text}
        </button>
    );
}

export default Button;
