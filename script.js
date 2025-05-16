const itemsTable = document.querySelector('#itemsTable tbody');
const addItemBtn = document.getElementById('addItemBtn');
const subtotalEl = document.getElementById('subtotal');
const taxRateInput = document.getElementById('taxRate');
const taxAmountEl = document.getElementById('taxAmount');
const totalAmountEl = document.getElementById('totalAmount');
const generateBtn = document.getElementById('generateBtn');
const printBtn = document.getElementById('printBtn');

function addItemRow() {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td><input type="text" class="desc" placeholder="Item name" /></td>
    <td><input type="number" class="qty" value="1" min="1" /></td>
    <td><input type="number" class="price" value="0.00" step="0.01" /></td>
    <td class="lineTotal">0.00</td>
    <td><button class="removeBtn">×</button></td>
  `;
  itemsTable.appendChild(row);

  row.querySelectorAll('.qty, .price').forEach(input =>
    input.addEventListener('input', updateTotals)
  );

  row.querySelector('.removeBtn').addEventListener('click', () => {
    row.remove();
    updateTotals();
  });
}

function updateTotals() {
  let subtotal = 0;

  itemsTable.querySelectorAll('tr').forEach(row => {
    const qty = parseFloat(row.querySelector('.qty').value) || 0;
    const price = parseFloat(row.querySelector('.price').value) || 0;
    const lineTotal = qty * price;
    row.querySelector('.lineTotal').textContent = lineTotal.toFixed(2);
    subtotal += lineTotal;
  });

  subtotalEl.textContent = subtotal.toFixed(2);

  const taxRate = parseFloat(taxRateInput.value) || 0;
  const tax = subtotal * (taxRate / 100);
  taxAmountEl.textContent = tax.toFixed(2);

  const total = subtotal + tax;
  totalAmountEl.textContent = total.toFixed(2);
}

addItemBtn.addEventListener('click', addItemRow);
generateBtn.addEventListener('click', updateTotals);
taxRateInput.addEventListener('input', updateTotals);
printBtn.addEventListener('click', () => {
  updateTotals();
  window.print();
});

addItemRow();
