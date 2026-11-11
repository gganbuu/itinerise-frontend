import type { DragEndEvent } from '@dnd-kit/react'
import type { IsoInstant, TimeSlotData } from '../../types/types'
import { ACTIVITY_BANK_ID, TIME_SLOT_DROP_TYPE } from '../../constants/calendar'

type DropTarget = NonNullable<DragEndEvent['operation']['target']>

// where a dragged activity landed, in terms the trip page understands
export type DropDestination = 
    | { kind: 'bank' }
    | { kind: 'timeSlot'; startTime: IsoInstant }

export function getDropDestination(target: DropTarget): DropDestination | null {
    if (target.id === ACTIVITY_BANK_ID) return { kind: 'bank' }

    if (target.type === TIME_SLOT_DROP_TYPE) {
        const { startTime } = target.data as TimeSlotData
        return { kind: 'timeSlot', startTime}
    }

    return null 
}