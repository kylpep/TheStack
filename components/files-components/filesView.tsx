import ItemBox from "@/components/item-components/itemBox";
import { useSliceRowIds } from "@/db/tinybase";
import { useCallback } from "react";
import type { SortableGridRenderItem } from "react-native-sortables";
import Sortable from "react-native-sortables";


type FilesProps = {
    parentId: string
}

export default function FilesView({ parentId }: FilesProps) {
    const itemIds = useSliceRowIds("parentIdIndex", parentId ?? "undefined");

    const renderItem = useCallback<SortableGridRenderItem<string>>(
        ({ item }) => (
            <ItemBox itemId={item} />
        ),
        []
    );

    return (
        <Sortable.Grid
            columns={1}
            data={itemIds}
            renderItem={renderItem}
            rowGap={10}
            overDrag="none"

        />
    )
}