import { useState } from "react";


type titleBoxProps={
    titleText: string,
    onTitleSubmit: string,
}

export default function TitleBox({titleText,onTitleSubmit}: titleBoxProps){
    const [isActive, setIsActive] = useState(false);
    
}