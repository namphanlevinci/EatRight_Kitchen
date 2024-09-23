import {gql} from '@apollo/client';

export const SAVE_PRINTER = gql`
  mutation (
    $code: String!
    $fcm_token: String!
    $printer_name: String!
    $status: Int
  ) {
    savePrinterDevice(
      code: $code
      fcm_token: $fcm_token
      printer_name: $printer_name
      status: $status
    ) {
      success
      message
    }
  }
`;

export const GET_LIST_RECEIPT = gql`
  query ($code: String!, $currentPage: Int) {
    getListReceiptByPrinter(
      code: $code
      currentPage: $currentPage
      pageSize: 10
    ) {
      items {
        increment_id
        restaurant_name
        restaurant_address
        phone_number
        order_date
        order_time
        order_type
        customer_name
        server
        website
        tip_amount {
          currency
          value
        }
        payment_method {
          title
          card_type
          last_digits
        }
        invoices {
          id
          number
          total {
            subtotal {
              currency
              value
            }
            grand_total {
              currency
              value
            }
            discounts {
              amount {
                currency
                value
              }
            }
            total_tax {
              currency
              value
            }
            shipping_handling {
              total_amount {
                currency
                value
              }
            }
          }
          items {
            product_name
            quantity_invoiced
            product_sale_price {
              currency
              value
            }
          }
        }
      }
      total_count
      page_info {
        page_size
        current_page
        total_pages
      }
    }
  }
`;

export const GET_ORDER_DETAIL = gql`
  query ($id: Int!) {
    orderDetail(id: $id) {
      id
      order_number
      created_at
      updated_at
      grand_total
      status
      flag_refund
      payment_method
      payment_method_code
      firstname
      lastname
      phone
      address
      customer_comment
      pickup_date
      pickup_time
      items {
        name
        qty
        price
        serving_status
        options {
          name
          qty
          price
          __typename
        }
        __typename
      }
      discount {
        amount {
          currency
          value
          __typename
        }
        label
        __typename
      }
      shipping_method
      use_plastic
      note
      customer_phone
      assign_from
      assign_reason
      shipping_amount
      table
      order_source
      serve_name
      restaurant_name
      restaurant_address
      restaurant_phone
      total {
        subtotal {
          value
          currency
        }
        discounts {
          amount {
            value
            currency
          }
          label
        }
        total_tax {
          value
          currency
        }
        taxes {
          amount {
            value
            currency
          }
          title
          rate
        }
        total_shipping {
          value
          currency
        }
        grand_total {
          value
          currency
        }
      }
      feedback_url
      payment_methods {
        name
        type
        additional_data {
          name
          value
        }
      }
      tip_amount {
        value
        currency
        __typename
      }
      __typename
    }
  }
`;

export const GET_RECECEIPT_BIILL_IMAGE = gql`
  query ($invoice_number: String!) {
    getReceiptBillImage(invoice_number: $invoice_number) {
      url
    }
  }
`;
