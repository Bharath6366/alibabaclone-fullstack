const PDFDocument =
  require("pdfkit");

const generateInvoice = (
  order
) => {
  return new Promise(
    (resolve) => {
      const doc =
        new PDFDocument({
          size: "A4",
          margin: 50,
        });

      const buffers = [];

      doc.on(
        "data",
        buffers.push.bind(
          buffers
        )
      );

      doc.on("end", () => {
        resolve(
          Buffer.concat(
            buffers
          )
        );
      });

      /* HEADER */
      doc
        .rect(0, 0, 595, 110)
        .fill("#ff6a00");

      doc
        .fillColor("white")
        .fontSize(28)
        .text(
          "Alibaba Store",
          50,
          35
        );

      doc
        .fontSize(13)
        .text(
          "Professional Ecommerce Invoice",
          50,
          72
        );

      doc
        .fillColor("black");

      /* INVOICE TITLE */
      doc
        .fontSize(24)
        .text(
          "INVOICE",
          50,
          140
        );

      /* INFO BOX */
      doc
        .roundedRect(
          50,
          180,
          495,
          120,
          10
        )
        .fill("#f8fafc");

      doc.fillColor(
        "#111"
      );

      doc.fontSize(12);

      doc.text(
        `Invoice ID: ${order.invoiceId}`,
        70,
        205
      );

      doc.text(
        `Order ID: ${order.orderId}`,
        70,
        230
      );

      doc.text(
        `Customer: ${order.customerName}`,
        70,
        255
      );

      doc.text(
        `Payment: ${order.paymentMethod}`,
        330,
        205
      );

      doc.text(
        `Status: ${order.status}`,
        330,
        230
      );

      doc.text(
        `Date: ${new Date(
          order.createdAt ||
            Date.now()
        ).toLocaleDateString()}`,
        330,
        255
      );

      /* TABLE HEADER */
      let y = 340;

      doc
        .rect(
          50,
          y,
          495,
          30
        )
        .fill("#111827");

      doc.fillColor(
        "white"
      );

      doc
        .fontSize(12)
        .text(
          "Product",
          65,
          y + 9
        );

      doc.text(
        "Qty",
        320,
        y + 9
      );

      doc.text(
        "Price",
        390,
        y + 9
      );

      doc.text(
        "Total",
        470,
        y + 9
      );

      y += 40;

      doc.fillColor(
        "#111"
      );

      order.items.forEach(
        (item, i) => {
          const price =
            item.salePrice ||
            item.price;

          const total =
            price *
            item.quantity;

          doc
            .fontSize(11)
            .text(
              item.name,
              65,
              y
            );

          doc.text(
            item.quantity.toString(),
            325,
            y
          );

          doc.text(
            `Rs.${price}`,
            390,
            y
          );

          doc.text(
            `Rs.${total}`,
            470,
            y
          );

          y += 28;

          doc
            .moveTo(
              50,
              y
            )
            .lineTo(
              545,
              y
            )
            .strokeColor(
              "#e5e7eb"
            )
            .stroke();

          y += 12;
        }
      );

      /* TOTAL BOX */
      y += 20;

      doc
        .roundedRect(
          320,
          y,
          225,
          70,
          10
        )
        .fill("#fff7ed");

      doc.fillColor(
        "#111"
      );

      doc
        .fontSize(13)
        .text(
          "Grand Total",
          340,
          y + 15
        );

      doc
        .fillColor(
          "#16a34a"
        )
        .fontSize(22)
        .text(
          `Rs.${order.total}`,
          340,
          y + 38
        );

      /* ADDRESS */
      y += 110;

      doc
        .fillColor(
          "#111"
        )
        .fontSize(16)
        .text(
          "Shipping Address",
          50,
          y
        );

      y += 30;

      doc
        .fontSize(11)
        .fillColor(
          "#444"
        )
        .text(
          `${order.address?.name || ""}`,
          50,
          y
        );

      doc.text(
        `${order.address?.house || ""}, ${
          order.address?.area || ""
        }`,
        50,
        y + 18
      );

      doc.text(
        `${order.address?.city || ""}, ${
          order.address?.state || ""
        } - ${
          order.address?.pincode || ""
        }`,
        50,
        y + 36
      );

      doc.text(
        `${order.address?.phone || ""}`,
        50,
        y + 54
      );

      /* FOOTER */
      doc
        .fontSize(10)
        .fillColor(
          "#777"
        )
        .text(
          "Thank you for shopping with Alibaba Store.",
          0,
          780,
          {
            align:
              "center",
          }
        );

      doc.end();
    }
  );
};

module.exports =
  generateInvoice;