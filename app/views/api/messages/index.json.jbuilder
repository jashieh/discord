@messages.each do |message|
    json.set! message.id do
        json.extract! message, :id, :body, :channel_id, :author_id, :created_at
    end
end