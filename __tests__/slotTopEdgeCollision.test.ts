import { slotTopEdgeCollision } from '../src/utils/slotTopEdgeCollision'
import { offsetToSlotIndex } from '../src/utils/calendarGrid'
import { SLOT_HEIGHT_PX, SLOTS_PER_DAY } from '../src/constants/calendar'

type DetectorInput = Parameters<typeof slotTopEdgeCollision>[0]

// a fake day column, in viewport pixels like dnd-kit measures
const COLUMN_TOP = 100
const COLUMN_LEFT = 0
const COLUMN_WIDTH = 180
const HALF = SLOT_HEIGHT_PX / 2

const slotTop = (index: number) => COLUMN_TOP + index * SLOT_HEIGHT_PX

// true when the detector says the block is over slot `slotIndex`
// builds only the fields the detector reads
function hits(slotIndex: number, draggedTop: number, pointerX = COLUMN_LEFT + COLUMN_WIDTH / 2): boolean {
  const top = slotTop(slotIndex)
  const input = {
    droppable: {
      id: `slot-${slotIndex}`,
      shape: {
        boundingRectangle: {
          top, bottom: top + SLOT_HEIGHT_PX, height: SLOT_HEIGHT_PX,
          left: COLUMN_LEFT, right: COLUMN_LEFT + COLUMN_WIDTH, width: COLUMN_WIDTH,
        },
      },
    },
    dragOperation: {
      position: { current: { x: pointerX, y: 0 } },
      shape: { current: { boundingRectangle: { top: draggedTop } } },
    },
  } as unknown as DetectorInput

  return slotTopEdgeCollision(input) !== null
}

describe('slotTopEdgeCollision', () => {
  test('pointer must be inside the column horizontally (pointer picks the day)', () => {
    expect(hits(0, slotTop(0), COLUMN_LEFT)).toBe(true)
    expect(hits(0, slotTop(0), COLUMN_LEFT + COLUMN_WIDTH)).toBe(false)  // right edge is exclusive
  })

  test('every top-edge position in the column matches exactly one slot, the same one offsetToSlotIndex picks', () => {
    const first = COLUMN_TOP - HALF
    const last = slotTop(SLOTS_PER_DAY - 1) + HALF  // exclusive

    for (let top = first; top < last; top++) {
      const matched: number[] = []
      for (let i = 0; i < SLOTS_PER_DAY; i++) {
        if (hits(i, top)) matched.push(i)
      }
      expect(matched, `top = ${top}`).toEqual([offsetToSlotIndex(top - COLUMN_TOP)])
    }
  })
})
