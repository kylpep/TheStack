import ItemBox from "@/components/files-components/item-components/itemBox";
import { View } from "react-native";
import FileFolder from "./fileFolder";
import FolderHeader from "./fileHeader";

export default function FilesView(){
    return(
                <View style={{
                    justifyContent: "center",
                    alignItems: "stretch",
                    flex: 1,
                    flexDirection: 'column',
                    padding: 10,
                    backgroundColor: "#111111",
                    rowGap: 10,
                }}>
                    <FileFolder/>
                    <FolderHeader/>
                    <ItemBox/>
                </View>
    )
}