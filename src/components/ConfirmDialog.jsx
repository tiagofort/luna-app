<ConfirmDialog
  title="Submit your request?"
  message="Our team will receive your selected items and contact you about the next steps."
  onConfirm={confirmRequest}
  onCancel={() => setConfirmDialogVisible(false)}
/>