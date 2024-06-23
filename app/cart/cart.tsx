export default function Cart(order: OrderType) {
  const [modifiedItems, setModifiedItems] = useState < OrderItem[] > (order.items);

  const addItem = (itemId: string) => {
    const newItems = [...modifiedItems, { id: itemId, quantity: 1, isSubscribe: true }]

    setModifiedItems(newItems)
  }

  const removeItem = (itemId: string) => {
    const newItems = modifiedItems.filter((value: OrderItem) => {
      value.id !== itemId
    })

    setModifiedItems(newItems)
  }

  const update = (item: OrderItem) => {
    const newItems = modifiedItems.map((value: OrderItem) => {
      if (value.id === item.id) {
        return item
      }
      return value;
    })

    setModifiedItems(newItems)
  }

  const checkoutForm = useFetcher()

  /**
   * Confirms checkout action, updates order.
   *
   */
  const onSubmit = async () => {
    //  show action confirmation dialog, 
    checkoutForm.submit({ id: order.id, items: modifiedItems, status: OrderStatus.checkout }, { method: "post", action: "?index" })
  }

  /**
   * Listens to form submission and 
   * create subscription in the database 
   * if successful.
   *
   */
  useEffect(() => {
    if (checkoutForm.state === "idle" && checkoutForm.data && checkoutForm.data.success) {
      const data = checkoutForm.data.data;
      // Create subscription
      const sub = await createSubscription(data.items);

      if (sub) {

      }
    }
  }, [checkoutForm]);

  return (
    <div className="grid grid-rows-2 md:grid-cols-[1fr_30%] md:gap-4 p-4">
      {/* Cart item details */}
      <div>
      </div>
      
      {/* Order summary */}
      <div>
      </div>
    </div>
  )
}