-- Run after creating the postits table. Seeds the wall with default ideas (no hardcoding in app code).

INSERT INTO postits (text, color, rotation, x, y, timestamp) VALUES
('Becoming clear that CLI is the best interface for agents... Every developer-related product (and eventually every product) needs to have a comprehensive CLI. Modal does this exceptionally', '#fde047', -8, 10, 5, 1000000000000),
('Personal software that sits on all your devices, recording location & audio, and creates a map of your life/diary', '#f9a8d4', -4, 55, 15, 1000000000001),
('Generative world models for anywhere (promptable reality/street view)', '#93c5fd', 0, 5, 55, 1000000000002),
('Some better way of doomscrolling... maybe articles? wikipedia? Sometimes have the impulse to scroll but would much rather be doing something educational, but there is a lack of options', '#86efac', 4, 50, 50, 1000000000003),
('Evolution is just the accumulation of mutation. Build something to track/simulate this process', '#c4b5fd', 8, 75, 35, 1000000000004),
('Science fiction where we are the ai getting prompted', '#fdba74', 12, 30, 70, 1000000000005),
('General agent for web scraping. In theory could populate everything from sitescroll in 5 prompts. Simple would just be tools to control browser + check all requests and responses inside a coding environment', '#fda4af', 16, 20, 30, 1000000000006);
