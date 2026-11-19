import { CollisionPriority, CollisionType, type CollisionDetector } from '@dnd-kit/abstract'

// A slot is a target when:
// - the pointer is horizontally inside the slot's column (pointer chooses the day), and
// - the dragged block's top edge is nearest to this slot's top line (block choosese the time)

export const slotTopEdgeCollision: CollisionDetector = ({ dragOperation, droppable}) => {
    // gather three values; if any is missing, answer is "no"
    const pointer = dragOperation.position.current
    const dragged = dragOperation.shape?.current.boundingRectangle
    const slot = droppable.shape?.boundingRectangle
    if (!pointer || !dragged || !slot ) return null

    // Day: is the pointer horizontally inside this slot's column?
    if (pointer.x < slot.left || pointer.x >= slot.right) return null

    // Time: is the block's top edge clsoest to THIS slot's top line?
    const half = slot.height / 2
    if (dragged.top < slot.top - half || dragged.top >= slot.bottom - half) return null

    return {
        id: droppable.id,
        value: 1,
        type: CollisionType.Collision,
        priority: CollisionPriority.High,
    }
}