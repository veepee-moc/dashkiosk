import React from 'react';
import { SortableElement, SortableContainer } from 'react-sortable-hoc';
import Group from '../../Group';
import Axios from 'axios';
import { toast } from 'react-toastify';

const SortableGroup = SortableElement(({ passedProps, groupWidth }) => {
    return (
        <li className="list-layout-item d-inline-block" style={{ width: groupWidth, maxWidth: groupWidth }}>
            <Group {...passedProps} />
        </li>
    );
});

const SortableList = SortableContainer(({ items }) => {
    return (
        <ul className="list-layout">
            {items}
        </ul>
    );
});

const SortableGroupList = ({ groups, searched, groupWidth }) => {
    const onSortEnd = ({ oldIndex, newIndex }) => {
        const srcGroup = groups[oldIndex];
        Axios.patch(`/api/group/move/${srcGroup}`, { newRank: newIndex })
            .catch(err => toast.error(`Failed to move group: ${err.message}`));
    };
    const sortableGroups = groups.map((groupId, key) =>
        <SortableGroup key={key} index={key} passedProps={{ groupId, searched }} groupWidth={groupWidth} />
    );
    return <SortableList items={sortableGroups} axis="xy" onSortEnd={onSortEnd} useDragHandle />
};

export default SortableGroupList;