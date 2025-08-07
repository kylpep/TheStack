/**
 * Custom text input that simplifies text input implementation in the app
 */

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { ColorValue, StyleProp, TextStyle } from "react-native";
import { TextInput } from "react-native-gesture-handler";

/**
 * Reference type for CustomTextInput methods
 */
export type CustomTextInputHandle = {
    focus: (() => void);
    blur: (() => void);
}

type textInputProps = {
    /** If false, text is not editable.
     *  Default is true.
     *  Has no effect if hasEditLock is set to true.
     */
    editable?: boolean

    /**
     * If true, editable is handled internally,
     * and editable state is managed with focusing and bluring.
     */
    hasEditLock?: boolean

    /** 
     * Callback that is called when the text input is focused
     */
    onFocus?: () => void

    /** 
     * Callback that is called when the text input is focused
     */
    onBlur?: () => void

    /**
     * Callback to set the value in storage upon text submission
     * @param text
     */
    setStorageValue: (text: string) => void

    /**
     * If true, submits text to storage when the input is blurred
     */
    submitOnBlur?: boolean

    /**
     * The string that will be rendered before text input has been entered
     */
    placeholderText?: string

    /**
     * The text color of the placeholderText
     */
    placeholderColor?: ColorValue

    /**
     * React hook that uses a value from storage
     * @returns A string or undefined value
     */
    storageHook?: () => any

    defaultText?: string

    /** Styles */
    style?: StyleProp<TextStyle>

    /** If true, the text input can wrap to multiple lines.
     * The default value is false
     */
    textWrap?: boolean

    autofocus?: boolean

    onSubmit?: () => void
}

/**
 * Custom text input that simplifies text input implementation in the app
 */
const CustomTextInput = forwardRef<CustomTextInputHandle, textInputProps>(({
    storageHook,
    setStorageValue,
    onFocus,
    onBlur,
    onSubmit,
    defaultText,
    autofocus = false,
    editable = true,
    style,
    placeholderText,
    placeholderColor,
    textWrap = true,
    hasEditLock = false,
}, ref) => {

    const referenceText = (storageHook?.() ?? defaultText ?? "Error fetching stored data") as string;
    const [text, setText] = useState(referenceText);
    const [isEditable, setIsEditable] = useState(false);
    const baseRef = useRef<TextInput>(null);

    //Use internal editable var if edit lock is on
    const compoundEditable = hasEditLock ? isEditable : editable;

    function submitText() {
        const submissionText = text.trim();
        if (submissionText) {
            setStorageValue(submissionText);
        }
        else setText(referenceText);
        onSubmit?.();
        setIsEditable(false);
    }

    function compoundFocus() {
        if (hasEditLock)
            setIsEditable(true);
        else baseRef.current?.focus();
    }

    function compoundBlur() {
        onBlur?.();
        baseRef.current?.blur();
        if (hasEditLock)
            setIsEditable(false);
        
    }

    useImperativeHandle(ref, () => ({
        focus: compoundFocus,
        blur: compoundBlur,
    }));

    //Updates when reference text changes from outside source
    useEffect(() => {
        setText(referenceText);
    }, [referenceText]);

    //Ensures the text box is editable before claiming focus
    useEffect(() => {
        if (hasEditLock && isEditable)
            baseRef.current?.focus();
    }, [isEditable]
    )

    return (
        <TextInput
            ref={baseRef}
            value={text}
            editable={compoundEditable}
            onChangeText={setText}
            onSubmitEditing={submitText}
            onFocus={onFocus}
            autoFocus={autofocus}
            style={[{ padding: 0 }, style]}
            placeholder={placeholderText}
            placeholderTextColor={placeholderColor}
            multiline={textWrap}
            scrollEnabled={false}
            submitBehavior="blurAndSubmit"
            pointerEvents={hasEditLock ? (compoundEditable ? "auto" : "none") : "auto"}
        />
    )
});

export default CustomTextInput;