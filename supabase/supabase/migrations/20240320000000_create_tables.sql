-- Create user_queries table for tracking daily query limits
CREATE TABLE IF NOT EXISTS user_queries (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    count INTEGER DEFAULT 0,
    last_query TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

-- Create RLS policies
ALTER TABLE user_queries ENABLE ROW LEVEL SECURITY;

-- Only allow authenticated users to read their own query count
CREATE POLICY "Users can read their own query count"
    ON user_queries
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

