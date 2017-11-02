class Session
  attr_accessor :id, :identity_id, :expires_at

  def initialize(attributes)
    self.id = attributes[:id] || SecureRandom.hex(20)
    self.identity_id = attributes[:identity_id]
    self.expires_at = attributes[:expires_at] || 30.days.from_now
  end
end
